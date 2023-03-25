import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, reset } from "../../features/post/postSlice";
import CreatePost from "../createpost/CreatePost";
import Post from "../post/Post";
import "./homecontent.scss";
import { toast } from "react-toastify";

const HomeContent = () => {
  const { posts, message, isError, isSuccess } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-content">
      <div className="content">
        <CreatePost />
        {posts && posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </div>
  );
};

export default HomeContent;
