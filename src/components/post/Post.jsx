import React, { useEffect, useState } from "react";
import "./post.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTimesCircle,
  FaHandPointUp,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ReactImageGrid from "facebook-image-grid";
import {
  deletePost,
  getAllComments,
  getAllPost,
  likePost,
  reset,
  unlikePost,
} from "../../features/post/postSlice";
import moment_tz from "moment-timezone";
import moment from "moment";
import "moment/locale/vi";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [moreOpen, setMoreOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const dispatch = useDispatch();

  const handleDeletePost = (e) => {
    e.preventDefault();
    dispatch(deletePost(post._id));
    setMoreOpen(false);
  };

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(likePost(post._id));
  };
  const handleRemoveLike = (e) => {
    e.preventDefault();
    dispatch(unlikePost(post._id));
  };

  const handleComment = (e) => {
    e.preventDefault();
    // dispatch(getAllComments(post._id));
    setComment(!comment);
  };

  const totalComment = () => {
    let totalReplyComment = 0;
    let commentPost = post?.comments.length;
    (post?.comments).forEach((comment) => {
      totalReplyComment += (comment?.reply).length;
    });
    let totalComment = commentPost + totalReplyComment;
    return totalComment;
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <Link to={`/profile/${post?.author?._id}`} className="infoUser">
            <img src={post?.author?.avatar?.url} alt="" />
            <div className="name-and-time">
              <span>{post?.author?.name}</span>
              <p>
                {moment(
                  moment_tz(post.createdAt).tz("Asia/Ho_Chi_Minh").format()
                ).fromNow()}
              </p>
            </div>
          </Link>
          {post.author._id === user.user._id && (
            <div className="feature" onClick={() => setMoreOpen(!moreOpen)}>
              <FaTimesCircle className="icon" />
            </div>
          )}
          {moreOpen && (
            <div className="more">
              <div className="bookmark">
                <FaTimesCircle />
                <span>Save post</span>
              </div>
              <hr />
              <div className="delete" onClick={handleDeletePost}>
                <FaTimesCircle />
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>
        <div className="text">{post?.body}</div>
        {post?.image && post?.image.length > 0 && (
          <div className="image">
            <ReactImageGrid images={post.image} />
          </div>
        )}

        <div className="react">
          <div className="info">
            {post?.likes && post?.likes.length > 0 && (
              <div className="like">
                <BiLike className="icon-like" />
                <span>{(post?.likes).length} thích</span>
              </div>
            )}
            <div className="comment-share">
              {post?.comments && post?.comments.length > 0 && (
                <div className="comment">{totalComment()} bình luận</div>
              )}
            </div>
          </div>
          <div className="feature">
            {post.likes &&
            post.likes.some((like) => like === user?.user._id) ? (
              <div className="status" onClick={handleRemoveLike}>
                <BiLike className="like" />
                <span style={{ color: "#0b83e6" }}>Thích</span>
              </div>
            ) : (
              <div className="status" onClick={handleLike}>
                <BiLike className="icon" />
                <span>Thích</span>
              </div>
            )}
            <div className="status" onClick={handleComment}>
              <FaComment className="icon" />
              Bình luận
            </div>

            <div className="status">
              <FaShare className="icon" />
              Chia sẻ
            </div>
          </div>
        </div>
        {comment && <Comment postid={post._id} comments={post?.comments} />}
      </div>
    </div>
  );
};

export default Post;
