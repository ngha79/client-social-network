import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptFriend,
  addFriend,
  deleteFriend,
  deleteInvitedFriend,
  deleteSendFriend,
} from "../../features/user/userSlice";

const ItemFriend = ({ user, typeButton }) => {
  const dispatch = useDispatch();

  return (
    <div className="user-friend">
      <div className="user">
        <Link to={`/profile/${user._id}`}>
          <header>
            <img src={user?.avatar?.url} alt="" />
          </header>
          <center>
            <h3>{user.name}</h3>
          </center>
        </Link>
        {typeButton === "invited" ? (
          <footer>
            <button
              className="blue-button"
              onClick={() => dispatch(acceptFriend(user._id))}
            >
              Xác nhận
            </button>
            <button onClick={() => dispatch(deleteInvitedFriend(user._id))}>
              Xóa
            </button>
          </footer>
        ) : typeButton === "suggest" ? (
          <footer>
            <button
              className="blue-button button-full"
              onClick={() => dispatch(addFriend(user._id))}
            >
              Kết bạn
            </button>
          </footer>
        ) : typeButton === "send" ? (
          <footer>
            <button
              className="button-full"
              onClick={() => dispatch(deleteSendFriend(user._id))}
            >
              Xóa
            </button>
          </footer>
        ) : (
          <footer>
            <button
              className="red-button button-full"
              onClick={() => dispatch(deleteFriend(user._id))}
            >
              Hủy kết bạn
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default ItemFriend;
