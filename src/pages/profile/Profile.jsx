import { useDispatch, useSelector } from "react-redux";
import "./profile.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { RiUserAddFill } from "react-icons/ri";
import Post from "../../components/post/Post";
import CreatePost from "../../components/createpost/CreatePost";
import { getUserById } from "../../features/post/postSlice";
import {
  acceptFriend,
  addFriend,
  deleteFriend,
  deleteInvitedFriend,
  deleteSendFriend,
} from "../../features/user/userSlice";
import UpdateUser from "../../components/updateuser/UpdateUser";
import { toast } from "react-toastify";
import { reset } from "../../features/auth/authSlice";

const Profile = () => {
  const { user, messageUpdate, isLoading } = useSelector((state) => state.auth);
  const { posts, profileUser } = useSelector((state) => state.posts);
  const { friends, sendInvite, invitedFriends } = useSelector(
    (state) => state.user
  );
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const allPosts = () => {
    const allpost = posts.filter((post) => post.author._id === userId);
    return allpost;
  };
  console.log(user);
  useEffect(() => {
    if (profileUser._id !== userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);

  const isFriend = () => {
    if (friends.some((user) => user._id === profileUser._id)) {
      return true;
    }
    return false;
  };

  const isSend = () => {
    if (sendInvite.some((user) => user._id === profileUser._id)) {
      return true;
    }
    return false;
  };

  const isInvite = () => {
    if (invitedFriends.some((user) => user._id === profileUser._id)) {
      return true;
    }
    return false;
  };

  const handleCancelUpdateUser = () => {
    setUpdateUser(!updateUser);
  };

  useEffect(() => {
    if (messageUpdate) {
      toast.success(messageUpdate);
      dispatch(reset());
      setUpdateUser(false);
    }
  }, [messageUpdate]);

  return (
    <div className="profile">
      <div className="container">
        <div className="info">
          <img
            src={
              profileUser?._id === user._id
                ? user?.avatar?.url
                : profileUser?.avatar?.url
            }
            alt=""
          />
          <div className="user">
            <span>
              {profileUser?._id === user._id ? user?.name : profileUser?.name}
            </span>
            <div className="follow">
              <div
                className="following"
                onClick={() => setOpenFollowing(!openFollowing)}
              >
                {profileUser?.friends && profileUser?.friends.length} Bạn bè
              </div>
            </div>
            {user && user._id === userId ? (
              <div className="update-profile">
                <button onClick={() => setUpdateUser(!updateUser)}>
                  Update Profile
                </button>
              </div>
            ) : (
              user._id !== profileUser._id &&
              (isFriend() ? (
                <div className="add-friend">
                  <Link to={"/message"} state={profileUser}>
                    <div className="update-profile">
                      <button>Nhắn tin</button>
                    </div>
                  </Link>
                  <button
                    onClick={() => dispatch(deleteFriend(profileUser._id))}
                  >
                    Hủy kết bạn
                  </button>
                </div>
              ) : isSend() ? (
                <div className="add-friend">
                  <Link to={"/message"} state={profileUser}>
                    <div className="update-profile">
                      <button>Nhắn tin</button>
                    </div>
                  </Link>
                  <button
                    onClick={() => dispatch(deleteSendFriend(profileUser._id))}
                  >
                    Hủy lời mời
                  </button>
                </div>
              ) : isInvite() ? (
                <div className="add-friend">
                  <Link to={"/message"} state={profileUser}>
                    <div className="update-profile">
                      <button>Nhắn tin</button>
                    </div>
                  </Link>
                  <button
                    onClick={() => dispatch(acceptFriend(profileUser._id))}
                  >
                    Chấp nhận
                  </button>
                  <button
                    className="delete"
                    onClick={() =>
                      dispatch(deleteInvitedFriend(profileUser._id))
                    }
                  >
                    Từ chối
                  </button>
                </div>
              ) : (
                <div className="add-friend">
                  {profileUser && (
                    <>
                      <Link to={"/message"} state={profileUser}>
                        <div className="update-profile">
                          <button>Nhắn tin</button>
                        </div>
                      </Link>
                      <button
                        onClick={() => dispatch(addFriend(profileUser._id))}
                      >
                        <RiUserAddFill />
                        Thêm bạn bè
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="post-info">
          {user && user._id === userId && <CreatePost />}
          {allPosts().map((post) => (
            <Post post={post} key={post?._id} />
          ))}
        </div>
      </div>

      {openFollowing && (
        <div className="list-followers">
          <div className="content">
            <div className="header">
              <span>Bạn bè</span>
              <GiCancel
                className="close-followers"
                onClick={() => setOpenFollowing(!openFollowing)}
              />
            </div>

            <div className="users">
              {profileUser?.friends.length > 0 &&
                profileUser?.friends.map((user) => (
                  <div
                    className="info"
                    onClick={() => setOpenFollowing(!openFollowing)}
                    key={user._id}
                  >
                    <Link to={`/profile/${user._id}`}>
                      <img src={user?.avatar.url} alt="" />
                      <span>{user.name}</span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {updateUser && (
        <UpdateUser handleCancelUpdateUser={handleCancelUpdateUser} />
      )}

      {isLoading && (
        <div className="loading">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Profile;
