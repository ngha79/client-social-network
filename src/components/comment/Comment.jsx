import "./comment.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend, AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaCamera, FaThumbsUp } from "react-icons/fa";
import {
  addReplyComment,
  commentPost,
  deleteReplyComment,
  likeComment,
  likeReplyComment,
  removeCommentPost,
  removeLikeReplyComment,
  rmLikeComment,
} from "../../features/post/postSlice";

const Comment = ({ postid, comments }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [moreFT, setMoreFT] = useState(false);
  const [image, setImage] = useState();
  const [imageReply, setImageReply] = useState();
  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState("");
  const [openDeleteCommentReply, setOpenDeleteCommentReply] = useState(false);

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const fileArray = URL.createObjectURL(e.target.files[0]);
      setImage(fileArray);
      URL.revokeObjectURL(e.target.files);
    }
  };

  const handleChangeReply = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const fileArray = URL.createObjectURL(e.target.files[0]);
      setImageReply(fileArray);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("postid", postid);
    if (file) {
      formData.append("image", file);
    }
    dispatch(commentPost(formData));
    setText("");
    setFile();
    setImage();
  };

  const handleDeleteComment = (e, commentId) => {
    e.preventDefault();
    const data = { postid, commentId };
    dispatch(removeCommentPost(data));
  };

  const handleLikeComment = (e, commentId) => {
    e.preventDefault();
    dispatch(likeComment(commentId));
  };

  const handleRemoveLikeComment = (e, commentId) => {
    e.preventDefault();
    dispatch(rmLikeComment(commentId));
  };

  const handleAddReplyComment = (e, commentId) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", reply);
    formData.append("postid", postid);
    formData.append("commentid", commentId);
    if (file) {
      formData.append("image", file);
    }
    dispatch(addReplyComment(formData));
    setImageReply();
    setFile();
    setReply("");
  };

  const handleRemoveReplyComment = (e, commentid, replyid) => {
    e.preventDefault();
    const data = { commentid, replyid };
    dispatch(deleteReplyComment(data));
  };

  const handleLikeReplyComment = (e, commentid, replyid) => {
    e.preventDefault();
    const data = { commentid, replyid };
    dispatch(likeReplyComment(data));
  };

  const handleRemoveLikeReplyComment = (e, commentid, replyid) => {
    e.preventDefault();
    const data = { commentid, replyid };
    dispatch(removeLikeReplyComment(data));
  };

  const changeText = (e) => {
    setText(e.target.value);
  };

  const deletePreviewImage = () => {
    setImage();
    setFile();
  };

  const setDeleteImage = (e, commentId) => {
    e.preventDefault();
    if (moreFT) {
      setMoreFT();
    } else {
      setMoreFT(commentId);
    }
  };

  return (
    <div className="comments">
      <div className="detail">
        <div className="user-comment">
          <Link to={`/profile/${user?.user._id}`}>
            <img src={user?.user?.avatar.url} alt="" />
          </Link>
          <div className="write">
            <div className="send-text">
              <input
                type="text"
                placeholder="Write comment..."
                value={text}
                onChange={changeText}
              />
              <AiOutlineSend className="send" onClick={handleAddComment} />
            </div>
            <input
              type="file"
              className="uploadImage"
              hidden
              onChange={handleChange}
            />
            <div
              className="preview"
              onClick={() => document.querySelector(".uploadImage").click()}
            >
              <FaCamera className="icon-uploadimage" />
            </div>
          </div>
        </div>
        {image && (
          <div className="preview-image">
            <div className="show-image">
              <img src={image} alt="" />
            </div>
            <AiOutlineClose
              className="close-image"
              onClick={() => deletePreviewImage()}
            />
          </div>
        )}
        {comments && (
          <div className="allcomments">
            {comments.map((comment) => (
              <>
                <div className="comment-reply" key={comment._id}>
                  <div className="comment">
                    <Link to={`/profile/${comment?.postedBy?._id}`}>
                      <img src={comment?.postedBy?.avatar?.url} alt="" />
                    </Link>
                    <div className="content-comment">
                      <div className="top">
                        <Link to={`/profile/${comment?.postedBy?._id}`}>
                          <span className="name">
                            {comment?.postedBy?.name}
                          </span>
                        </Link>
                        <div className="text">{comment?.text}</div>
                        {comment?.image?.url && (
                          <img
                            src={comment?.image?.url}
                            alt=""
                            className="img-comment"
                          />
                        )}
                        <FiMoreHorizontal
                          className="feature-comment"
                          onClick={(e) => setDeleteImage(e, comment._id)}
                        />
                        {moreFT === comment._id && (
                          <div
                            className="delete-comment"
                            onClick={(e) => handleDeleteComment(e, comment._id)}
                          >
                            Delete
                          </div>
                        )}

                        {comment?.like && comment.like.length > 0 ? (
                          <div className="total-like">
                            <FaThumbsUp className="icon-like" />
                            <span>{(comment?.like).length}</span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="bottom">
                        {comment?.like &&
                        Array.from(comment?.like).some(
                          (like) => like === user?.user._id
                        ) ? (
                          <>
                            <span
                              className="like-comment color-text"
                              onClick={(e) =>
                                handleRemoveLikeComment(e, comment._id)
                              }
                            >
                              Like
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className="like-comment"
                              onClick={(e) => handleLikeComment(e, comment._id)}
                            >
                              Like
                            </span>
                          </>
                        )}

                        <span
                          className="reply-comment"
                          onClick={() => setOpen(comment._id)}
                        >
                          Reply
                        </span>
                      </div>
                    </div>
                  </div>

                  {open === comment._id && (
                    <div className="reply-comments">
                      <div className="user-comment">
                        <Link to={`/profile/${user?.user._id}`}>
                          <img src={user?.user?.avatar.url} alt="" />
                        </Link>
                        <div className="write">
                          <div className="send-text">
                            <input
                              type="text"
                              placeholder="Write comment..."
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                            />
                            <AiOutlineSend
                              className="send"
                              onClick={(e) =>
                                handleAddReplyComment(e, comment._id)
                              }
                            />
                          </div>
                          <input
                            type="file"
                            className="uploadImageReply"
                            hidden
                            onChange={handleChangeReply}
                          />
                          <div
                            className="preview"
                            onClick={() =>
                              document
                                .querySelector(".uploadImageReply")
                                .click()
                            }
                          >
                            <AiOutlineCamera className="icon-uploadimage" />
                          </div>
                        </div>
                      </div>
                      {imageReply && (
                        <div className="preview-image">
                          <div className="show-image">
                            <img src={imageReply} alt="" />
                          </div>
                          <AiOutlineClose
                            className="close-image"
                            onClick={() => setImageReply()}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {comment.reply &&
                    Array.from(comment.reply).map((reply) => (
                      <>
                        <div className="user-reply" key={reply._id}>
                          <Link to={`/profile/${reply?.postedBy._id}`}>
                            <img src={reply?.postedBy?.avatar?.url} alt="" />
                          </Link>

                          <div className="content-reply">
                            <Link to={`/profile/${reply?.postedBy._id}`}>
                              <div className="name">{reply?.postedBy.name}</div>
                            </Link>
                            <div className="text-reply">{reply.text}</div>
                            {reply?.image?.url && (
                              <div className="image-reply">
                                <img src={reply?.image?.url} alt="" />
                              </div>
                            )}
                            <FiMoreHorizontal
                              className="feature-reply-comment"
                              onClick={(e) => setDeleteImage(e, reply?._id)}
                            />
                            {moreFT == reply?._id && (
                              <>
                                <div
                                  className="delete-reply-comment"
                                  onClick={(e) =>
                                    handleRemoveReplyComment(
                                      e,
                                      comment._id,
                                      reply._id
                                    )
                                  }
                                >
                                  Delete
                                </div>
                              </>
                            )}
                            {Array.from(reply.like).some(
                              (reply) => reply === user?.user._id
                            ) ? (
                              <div
                                className="like-reply color-text"
                                onClick={(e) =>
                                  handleRemoveLikeReplyComment(
                                    e,
                                    comment._id,
                                    reply._id
                                  )
                                }
                              >
                                Like
                              </div>
                            ) : (
                              <div
                                className="like-reply"
                                onClick={(e) =>
                                  handleLikeReplyComment(
                                    e,
                                    comment._id,
                                    reply._id
                                  )
                                }
                              >
                                Like
                              </div>
                            )}
                            {reply?.like.length > 0 && (
                              <>
                                <div className="like-reply-total">
                                  <FaThumbsUp className="like-reply-icon" />
                                  <span>{reply.like.length}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
