import React, { useEffect, useRef, useState } from "react";
import "./createpost.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTimesCircle, FaCloudUploadAlt } from "react-icons/fa";
import { createPost, reset } from "../../features/post/postSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState([]);
  const [image, setImage] = useState();
  const imageRef = useRef();
  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFile((prevImage) => prevImage.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhoto = (source) => {
    let len = source.length;
    return source.map((photo) => {
      return (
        <img
          src={photo}
          key={photo}
          style={{ width: `calc(100%/${len})`, height: "100%" }}
        />
      );
    });
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setFile([]);
    setImage();
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (!image && post.length === 0) return;
    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
    }
    formData.append("body", post);

    dispatch(createPost(formData));
    setOpenCreatePost(false);
    setFile([]);
    setImage();
    setPost("");
  };

  return (
    <>
      <div className="createpost">
        <div className="container">
          <div className="user">
            <Link to={`/profile/${user?.user._id}`}>
              <img src={user?.user.avatar.url} alt="" />
            </Link>
            <input
              type="text"
              placeholder="Write some thing?"
              onClick={() => setOpenCreatePost(!openCreatePost)}
            />
          </div>
        </div>
        {openCreatePost && (
          <div className="create">
            <div className="contentCreate">
              <div className="title">
                <span>Create Post</span>
                <FaTimesCircle
                  className="closetag"
                  onClick={() => setOpenCreatePost(!createPost)}
                />
              </div>
              <div className="user">
                <img src={user?.user.avatar.url} alt="" />
                <span>{user?.user.name}</span>
              </div>
              <div className="content">
                <input
                  type="text"
                  placeholder="Write some thing?"
                  className="text"
                  onChange={(e) => setPost(e.target.value)}
                />
                <div className="upload">
                  <input
                    type="file"
                    className="uploadFile"
                    onChange={handleChange}
                    ref={imageRef}
                    multiple
                    hidden
                  />
                  <form>
                    <div
                      className="preview"
                      onClick={() => imageRef.current.click()}
                    >
                      {file ? renderPhoto(file) : <FaCloudUploadAlt />}
                    </div>
                    {file ? (
                      <FaTimesCircle
                        className="delete"
                        onClick={handleDeleteImage}
                      />
                    ) : (
                      <FaCloudUploadAlt />
                    )}
                  </form>
                </div>
              </div>
              <button onClick={handleCreatePost}>Post</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
