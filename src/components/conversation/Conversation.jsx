import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./conversation.scss";
import { socket } from "../../utils/socket";
import moment_tz from "moment-timezone";
import moment from "moment";

const Conversation = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  const listUser = chat?.members.filter((member) => member._id !== user._id);
  const [isOnline, setIsOnline] = useState(false);
  const [lastLogin, setLastLogin] = useState();

  useEffect(() => {
    if (!chat.leader) {
      socket.emit(
        "get user online",
        listUser[0]._id,
        ({ isOnline, lastLogin }) => {
          setIsOnline(isOnline === "true" ? true : false);
          setLastLogin(lastLogin);
        }
      );
    } else {
      socket.emit("get user online chat", listUser, ({ isOnline }) => {
        setIsOnline(isOnline === "true" ? true : false);
      });
    }
  }, []);
  return (
    <div className="chatlist">
      <div className="avatarChat">
        <img
          src={chat?.image ? chat?.image : listUser[0]?.avatar?.url}
          alt=""
        />
        {isOnline && <div className="status online"></div>}
        {lastLogin && lastLogin !== "null" && !chat.leader && (
          <div className="lastLogin">
            Online{" "}
            {moment(
              moment_tz(lastLogin).tz("Asia/Ho_Chi_Minh").format()
            ).fromNow()}
          </div>
        )}
      </div>
      <span>{chat?.name ? chat?.name : listUser[0]?.name}</span>
    </div>
  );
};

export default Conversation;
