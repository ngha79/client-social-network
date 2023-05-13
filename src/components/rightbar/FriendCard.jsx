import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../utils/socket";
import moment_tz from "moment-timezone";
import moment from "moment";

const FriendCard = ({ user }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastLogin, setLastLogin] = useState();

  useEffect(() => {
    socket.emit("get user online", user._id, ({ isOnline, lastLogin }) => {
      setIsOnline(isOnline === "true" ? true : false);
      setLastLogin(lastLogin);
    });
  }, []);

  return (
    <div className="user">
      <Link to={`/profile/${user._id}`}>
        <div className="userInfo">
          <img className="image" src={user?.avatar?.url} alt="" />
          {isOnline && <div className="online"></div>}
          {lastLogin && lastLogin !== "null" && (
            <div className="lastLogin">
              Online{" "}
              {moment(
                moment_tz(lastLogin).tz("Asia/Ho_Chi_Minh").format()
              ).fromNow()}
            </div>
          )}
          <div className="name">{user.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default FriendCard;
