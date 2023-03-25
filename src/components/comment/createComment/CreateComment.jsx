import "./comment.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineCamera, AiOutlineClose, AiOutlineSend } from "react-icons/ai";

const backendURL = "http://localhost:5000";

const CreateComment = () => {
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const [comment, setComment] = useState([]);
  const [likeComment, setLikeComment] = useState([]);
  const [comments, setComments] = useState([]);
  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const fileArray = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files);
      setImage(fileArray);
      URL.revokeObjectURL(e.target.files);
    }
  };

  const addcomment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("postid", postid);
    if (file) {
      formData.append("image", file);
    }
    let comment = await axios.request({
      method: "POST",
      url: `${backendURL}/comments/addcomment`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: formData,
    });
    comment = comment.data;
    setComment(comment.comment);
    setImage();

    setFile();
    setText("");
  };

  const allComment = async (e) => {
    let allComments = await axios.request({
      method: "GET",
      url: `${backendURL}/comments/getAllComment/${postid}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setComments(allComments?.data.comments);
  };

  useEffect(() => {
    allComment();
  }, [comment, likeComment]);

  const changeText = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <div className="user-comment">
        <Link to={`/profile/${user?.user.userId}`}>
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
            <AiOutlineSend className="send" onClick={addcomment} />
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
            <AiOutlineCamera className="icon-uploadimage" />
          </div>
        </div>
      </div>
      {image && (
        <div className="preview-image">
          <div className="show-image">
            <img src={image} alt="" />
          </div>
          <AiOutlineClose className="close-image" onClick={() => setImage()} />
        </div>
      )}
    </>
  );
};

export default CreateComment;
