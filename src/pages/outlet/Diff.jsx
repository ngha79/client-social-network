import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { getAllPost } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import {
  allFriend,
  allSendFriend,
  allInviteFriend,
  getUserIsNotFriend,
  addFriendInvited,
  unfriend,
  acceptFriendInvited,
  deleteSendInvitedFriend,
  refusedInvitedFriend,
} from "../../features/user/userSlice";
import {
  createMessage,
  deleteMessage,
  likeMessage,
  receiverMessage,
  removeLikeMessage,
  messageDelete,
  sendMessageLike,
  sendMessageUnLike,
  kickMemberChat,
  addMemberChat,
  outChat,
  passLeaderChat,
  deleteChat,
  getAllChat,
  updateChat,
  resetNewChat,
  getMessages,
  updateChatSend,
  updateKickUserAndDropGroup,
  updateAddMember,
  deleteChatCurrent,
  updateChatAfterKick,
  updateChatAfterAddMember,
  exitChatCurrent,
  addGroup,
  callVideoChat,
} from "../../features/chat/chatSlice";
import CallVideoSend from "../../components/callvideo/CallVideoSend";
import CallVideo from "../../components/callvideo/CallVideo";
import ConversationChat from "../conversation/ConversationChat";
import { socket } from "../../utils/socket";
import noti from "../../assets/noti.mp3";
import soundcall from "../../assets/callvideosound.mp3";
import { NotificationSound } from "../../components/notification/Notification";

const Diff = () => {
  const { user, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const { chat, isGetChat, callVideo, updateChatCurrent, memberChat } =
    useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const [isCallVideo, setIsCallVideo] = useState(false);
  const [callVideoReceiver, setCallVideoReceiver] = useState(false);
  const [chatCallVideo, setChatCallVideo] = useState("");

  useEffect(() => {
    socket.on("call video receiver", (chatId) => {
      setCallVideoReceiver(true);
      setChatCallVideo(chatId);
    });

    socket.on("call video refuse receiver", (chatId) => {
      dispatch(callVideoChat(false));
      setChatCallVideo(chatId);
    });

    socket.on("call video cancel receiver", (chatId) => {
      setCallVideoReceiver(false);
      setChatCallVideo(chatId);
    });

    socket.on("is call video receiver", (chatId) => {
      dispatch(callVideoChat(false));
      setChatCallVideo(chatId);
      setIsCallVideo(true);
    });

    socket.on("call video end receiver", (chatId) => {
      setChatCallVideo(chatId);
      setIsCallVideo(false);
    });
  }, []);

  useEffect(() => {
    socket.on("receiverMessage", (chat) => {
      dispatch(receiverMessage(chat.receiver));
      const audio = new Audio(noti);
      audio.play();
    });

    socket.on("updateMessageDel", (chat) => {
      dispatch(messageDelete(chat.delete));
      const audio = new Audio(noti);
      audio.play();
    });
    socket.on("updateMessageLike", (chat) => {
      dispatch(sendMessageLike(chat.like));
      const audio = new Audio(noti);
      audio.play();
    });
    socket.on("updateMessageUnLike", (chat) => {
      dispatch(sendMessageUnLike(chat.unlike));
      const audio = new Audio(noti);
      audio.play();
    });
    socket.on("passLeaderSend", (chat) => {
      dispatch(updateChatSend(chat.updateChat));
      const audio = new Audio(noti);
      audio.play();
    });
    socket.on("addMemberSend", (chat) => {
      if (chat.memberId.some((member) => member === user._id.toString())) {
        dispatch(updateChatAfterAddMember(chat.updateChat));
        socket.emit("join chat", chat._id);
      } else {
        dispatch(updateAddMember(chat.updateChat));
      }
      dispatch(updateChat());
      const audio = new Audio(noti);
      audio.play();
    });

    socket.on("exitChatSend", (chat) => {
      dispatch(exitChatCurrent(chat.updateChat));
      dispatch(updateChat());
      const audio = new Audio(noti);
      audio.play();
    });
    socket.on("create group", (group) => {
      dispatch(addGroup(group));
      const audio = new Audio(noti);
      audio.play();
      socket.emit("join chat", group._id);
    });
  }, []);

  useEffect(() => {
    socket.on("add friend invited", (friend) => {
      dispatch(addFriendInvited(friend));
      toast.success("Bạn có lời mời kết bạn mới!");
    });
    socket.on("send unfriend invited", (friend) => {
      dispatch(unfriend(friend));
    });
    socket.on("accept invited friend", (friend) => {
      dispatch(acceptFriendInvited(friend));
      toast.success(`${friend.name} đã chấp nhận lời mời kết bạn.`);
    });
    socket.on("delete send invited friend", (friend) => {
      dispatch(deleteSendInvitedFriend(friend));
    });
    socket.on("delete refused invited friend", (friend) => {
      dispatch(refusedInvitedFriend(friend));
    });
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const author = user._id;
    dispatch(getUserIsNotFriend());
    dispatch(allFriend());
    dispatch(allSendFriend());
    dispatch(allInviteFriend());
    dispatch(getAllPost(author));
    if (!isGetChat) {
      dispatch(getAllChat(user._id));
    }
  }, [isError, message, user]);

  const handleSetVideoReceiver = () => {
    setCallVideoReceiver(!callVideoReceiver);
  };

  const handleCallVideo = () => {
    setIsCallVideo(true);
  };

  const handleOutCallVideoSend = () => {
    setIsCallVideo(false);
  };

  return (
    <div>
      <NavBar />
      <Outlet />
      {callVideoReceiver && (
        <>
          <CallVideo
            handleSetVideoCallReceiver={handleSetVideoReceiver}
            handleCallVideo={handleCallVideo}
            chatId={chatCallVideo}
          />
          <video loop autoPlay style={{ display: "none" }} id="videomain">
            <source src={soundcall} type="video/mp4" />
          </video>
        </>
      )}
      {callVideo && (
        <>
          <CallVideoSend chatId={chatCallVideo} />
          <video loop autoPlay style={{ display: "none" }} id="videomain">
            <source src={soundcall} type="video/mp4" />
          </video>
        </>
      )}
      {isCallVideo && (
        <ConversationChat
          handleOutCallVideoSend={handleOutCallVideoSend}
          conversationId={chatCallVideo}
        />
      )}
    </div>
  );
};

export default Diff;
