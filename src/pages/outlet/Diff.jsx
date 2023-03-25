import React, { useEffect } from "react";
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
} from "../../features/user/userSlice";
import { getAllChat } from "../../features/chat/chatSlice";

const Diff = () => {
  const { user, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    const author = user.user._id;
    dispatch(getUserIsNotFriend());
    dispatch(allFriend());
    dispatch(allSendFriend());
    dispatch(allInviteFriend());
    dispatch(getAllPost(author));
  }, [isError, message, user]);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Diff;
