import React from "react";
import "./leftbar.scss";
import {
  FaUserFriends,
  FaObjectGroup,
  FaBookmark,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <Link to={`/profile/${user?._id}`}>
            <div className="user">
              <img src={user?.avatar?.url} alt="" />
              <p>{user?.name}</p>
            </div>
          </Link>
          <Link to={"/friends"}>
            <div className="item">
              <FaUserFriends className="icon" />
              <p>Bạn bè</p>
            </div>
          </Link>
          <div className="item">
            <FaObjectGroup className="icon" />
            <p>Nhóm</p>
          </div>
          <div className="item">
            <FaBookmark className="icon" />
            <p>Đã lưu</p>
          </div>
          <div className="item">
            <FaVideo className="icon" />
            <p>Watch</p>
          </div>
        </div>
        <div className="shortcuts">
          <div className="title">Lối tắt</div>
          <div className="item">
            <FaVideo className="icon" />
            <p>Watch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
