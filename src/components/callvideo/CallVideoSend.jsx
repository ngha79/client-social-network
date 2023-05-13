import { useDispatch } from "react-redux";
import { callVideoChat } from "../../features/chat/chatSlice";
import { socket } from "../../utils/socket";
import "./callVideo.scss";

const CallVideoSend = ({ chatId }) => {
  const dispatch = useDispatch();
  const handleRefuseCallVideo = () => {
    dispatch(callVideoChat(false));
    socket.emit("call video cancel", chatId);
  };
  return (
    <div className="call-video">
      <center className="video">
        <header>Đang gọi</header>
        <center>
          <button className="refuse" onClick={() => handleRefuseCallVideo()}>
            Hủy
          </button>
        </center>
      </center>
    </div>
  );
};

export default CallVideoSend;
