import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptFriend,
  acceptFriendInvited,
  addFriend,
  addFriendInvited,
  allFriend,
  deleteInvitedFriend,
  deleteSendFriend,
  deleteSendInvitedFriend,
  getUserIsNotFriend,
  refusedInvitedFriend,
  unfriend,
} from "../../features/user/userSlice";
import "./rightbar.scss";
import { socket } from "../../utils/socket";

const RightBar = () => {
  const { user } = useSelector((state) => state.auth);
  const { people, friends, sendInvite, invitedFriends } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("add friend invited", (friend) => {
      dispatch(addFriendInvited(friend));
    });
    socket.on("send unfriend invited", (friend) => {
      dispatch(unfriend(friend));
    });
    socket.on("accept invited friend", (friend) => {
      dispatch(acceptFriendInvited(friend));
    });
    socket.on("delete send invited friend", (friend) => {
      dispatch(deleteSendInvitedFriend(friend));
    });
    socket.on("delete refused invited friend", (friend) => {
      dispatch(refusedInvitedFriend(friend));
    });
  }, []);
  return (
    <div className="rightbar">
      <div className="container">
        {people.length > 0 && (
          <div className="item">
            <span>Gợi ý cho bạn</span>
            {people &&
              people.map((user) => (
                <div className="user" key={user._id}>
                  <Link to={`/profile/${user._id}`}>
                    <div className="userInfo">
                      <img className="image" src={user?.avatar.url} alt="" />
                      <p>{user?.name}</p>
                    </div>
                  </Link>
                  <button onClick={() => dispatch(addFriend(user._id))}>
                    Kết bạn
                  </button>
                </div>
              ))}
          </div>
        )}
        <div className="item">
          {invitedFriends.length > 0 && (
            <>
              <span>Lời mời kết bạn</span>
              {invitedFriends.map((user) => (
                <div className="user" key={user._id}>
                  <Link to={`/profile/${user._id}`}>
                    <div className="userInfo">
                      <img className="image" src={user?.avatar?.url} alt="" />
                      <div className="online"></div>
                      <p>{user.name}</p>
                    </div>
                  </Link>
                  <div>
                    <button
                      onClick={() => dispatch(deleteInvitedFriend(user._id))}
                      className="refuse-invite"
                    >
                      Từ chối
                    </button>
                    <button onClick={() => dispatch(acceptFriend(user._id))}>
                      Chấp nhận
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="item">
          {sendInvite.length > 0 && (
            <>
              <span>Lời mời đã gửi</span>
              {sendInvite.map((user) => (
                <div className="user" key={user._id}>
                  <Link to={`/profile/${user._id}`}>
                    <div className="userInfo">
                      <img className="image" src={user?.avatar?.url} alt="" />
                      <div className="online"></div>
                      <p>{user.name}</p>
                    </div>
                  </Link>
                  <button onClick={() => dispatch(deleteSendFriend(user._id))}>
                    Hủy
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="item">
          <span>Người liên hệ</span>
          {friends &&
            friends.map((user) => (
              <div className="user" key={user._id}>
                <Link to={`/profile/${user._id}`}>
                  <div className="userInfo">
                    <img className="image" src={user?.avatar?.url} alt="" />
                    <div className="online"></div>
                    <p>{user.name}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
