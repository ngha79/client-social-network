import React from "react";
import { useSelector } from "react-redux";
import "./conversation.scss";

const Conversation = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  const listUser = chat?.members.filter(
    (member) => member._id !== user.user._id
  );
  return (
    <div className="chatlist">
      <div className="avatarChat">
        <img
          src={chat?.image ? chat?.image : listUser[0]?.avatar?.url}
          alt=""
        />
        {!chat.image && <div className="status online"></div>}
      </div>
      <span>{chat?.name ? chat?.name : listUser[0]?.name}</span>
    </div>
  );
};

export default Conversation;
