import { socket } from "../../utils/socket";
import "./callVideo.scss";

const CallVideo = ({ handleSetVideoCallReceiver, handleCallVideo, chatId }) => {
  const handleRefuseCallVideo = () => {
    handleSetVideoCallReceiver();
    socket.emit("call video refuse", chatId);
  };

  const callVideo = () => {
    handleSetVideoCallReceiver();
    handleCallVideo();
    socket.emit("is call video", chatId);
  };
  return (
    <div className="call-video">
      <center className="video">
        <header>Cuộc gọi tới</header>
        <center>
          <button onClick={() => callVideo()}>Nghe</button>
          <button className="refuse" onClick={() => handleRefuseCallVideo()}>
            Từ chối
          </button>
        </center>
      </center>
    </div>
  );
};

export default CallVideo;
