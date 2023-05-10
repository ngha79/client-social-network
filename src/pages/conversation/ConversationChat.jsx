import React, { useEffect, useRef, useState } from "react";
import "./conversation.scss";
import { BsCameraVideo, BsFillTelephoneXFill } from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
import { GoDeviceDesktop } from "react-icons/go";
import peerjs from "peerjs";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import callVideoHelpers from "./callVideoHelpers";

const ConversationChat = () => {
  const { user } = useSelector((state) => state.auth);
  const { _id } = user.user;
  const myStreamRef = useRef({ srcObject: "" });
  const [myStream, setMyStream] = useState(null);
  const remoteStreamRef = useRef({ srcObject: "" });
  const remotePeerRef = useRef(null);
  const { conversationId } = useParams();
  const peerRef = useRef(new Peer());
  const peerIdRef = useRef("");
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const peers = {};

  const handleToggleVideo = () => {
    myStreamRef.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideo(myStreamRef.current.srcObject.getVideoTracks()[0].enabled);
  };

  const handleToggleAudioOn = () => {
    myStreamRef.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = true));
    setAudio(true);
  };
  const handleToggleAudioOff = () => {
    myStreamRef.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = false));
    setAudio(false);
  };

  socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
  });

  const handleShareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        myStreamRef.current.srcObject = stream;

        let videoTrack = myStreamRef.current.srcObject.getVideoTracks()[0];
        let audioTrack = stream.getAudioTracks()[0];
        videoTrack.onended = () => {
          navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: true,
            })
            .then((stream) => {
              myStreamRef.current.srcObject = stream;
              let videoTrack =
                myStreamRef.current.srcObject.getVideoTracks()[0];
              let audioTrack =
                myStreamRef.current.srcObject.getAudioTracks()[0];
              let sender = remotePeerRef.current.peerConnection
                .getSenders()
                .find(function (s) {
                  return s.track.kind == videoTrack.kind;
                });
              let audioSender = remotePeerRef.current.peerConnection
                .getSenders()
                .find(function (s) {
                  return s.track.kind == audioTrack.kind;
                });
              sender.replaceTrack(videoTrack);
              audioSender.replaceTrack(audioTrack);
            });
        };
        let sender = remotePeerRef.current.peerConnection
          .getSenders()
          .find(function (s) {
            return s.track.kind == videoTrack.kind;
          });

        sender.replaceTrack(videoTrack);
        let audioSender = remotePeerRef.current.peerConnection
          .getSenders()
          .find(function (s) {
            return s.track.kind == audioTrack.kind;
          });
        audioSender.addTrack(audioTrack);
      });
  };

  useEffect(() => {
    if (_id) {
      peerRef.current.on("open", function (id) {
        peerIdRef.current = id;
        socket.emit("subscribe-call-video", {
          conversationId,
          newUserId: _id,
          peerId: id,
        });
      });

      peerRef.current.on("call", function (call) {
        remotePeerRef.current = call;
        let streamTempt = myStreamRef.current.srcObject;
        call.answer(streamTempt);
        const senderId = call.metadata.userId;
        call.on("stream", function (remoteStream) {
          remoteStreamRef.current.srcObject = remoteStream;
        });
      });
    }

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        myStreamRef.current.srcObject = stream;
      });
  }, []);

  useEffect(() => {
    socket.on("new-user-call", ({ conversationId, newUserId, peerId }) => {
      let streamTempt = myStreamRef.current.srcObject;

      const call = peerRef.current.call(peerId, streamTempt, {
        metadata: {
          userId: _id,
        },
      });
      peers[newUserId] = call;
      call.on("stream", function (remoteStream) {
        remotePeerRef.current = call;
        remoteStreamRef.current.srcObject = remoteStream;
      });
      call.on("close", function () {
        video.remove();
      });

      call.on("disconnected", function () {
        video.remove();
      });
    });
  }, []);

  return (
    <div className="conversation">
      <div className="screen-user">
        <video
          ref={remoteStreamRef}
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="screen-small">
        <video
          ref={myStreamRef}
          autoPlay
          style={{ width: "100%" }}
          muted
        ></video>
      </div>
      <footer className="footer-conversation">
        {video ? (
          <div className="icon" onClick={handleToggleVideo}>
            <BsCameraVideo size={28} className="icon-call" />
          </div>
        ) : (
          <div className="icon cancel" onClick={handleToggleVideo}>
            <BsCameraVideo size={28} className="icon-call" />
          </div>
        )}

        {audio ? (
          <div className="icon" onClick={handleToggleAudioOff}>
            <MdKeyboardVoice size={28} className="icon-call" />
          </div>
        ) : (
          <div className="icon cancel" onClick={handleToggleAudioOn}>
            <MdKeyboardVoice size={28} className="icon-call" />
          </div>
        )}
        <div className="icon" onClick={handleShareScreen}>
          <GoDeviceDesktop size={28} className="icon-call" />
        </div>
        <div className="icon cancel">
          <BsFillTelephoneXFill size={28} className="icon-call" />
        </div>
      </footer>
    </div>
  );
};

export default ConversationChat;
