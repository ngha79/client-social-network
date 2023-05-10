import axiosClient from "../axiosClient";

const API_URL_POST = "/post";
const API_URL_COMMENT = "/comment";
const API_URI = "/user";

const getAllPost = async (author) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URL_POST}/getAllPost/${author}`,
  });
  return response.data;
};

const createPost = async (data) => {
  const response = await axiosClient.request({
    method: "POST",
    url: `${API_URL_POST}/createPost`,
    headers: { "Content-type": "multipart/form-data" },
    data: data,
  });
  return response.data;
};

const deletePost = async (postid) => {
  const response = await axiosClient.request({
    method: "DELETE",
    url: `${API_URL_POST}/deletePost/${postid}`,
  });
  return response.data;
};

const likePost = async (postId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_POST}/likePost/${postId}`,
  });
  return response.data;
};
const unlikePost = async (postId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_POST}/unlikePost/${postId}`,
  });
  return response.data;
};

const commentPost = async (formData) => {
  const response = await axiosClient.request({
    method: "POST",
    url: `${API_URL_COMMENT}/addcomment`,

    data: formData,
  });
  return response.data;
};

const removeCommentPost = async (data) => {
  const response = await axiosClient.request({
    method: "DELETE",
    url: `${API_URL_COMMENT}/removecomment/${data.postid}/${data.commentId}`,
  });
  return response.data;
};

const getAllComments = async (postId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URL_COMMENT}/getAllComment/${postId}`,
  });
  return response.data;
};

const likeComment = async (commentId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/likecomment/${commentId}`,
  });
  return response.data;
};

const rmLikeComment = async (commentId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/removelikecomment/${commentId}`,
  });
  return response.data;
};

const addReplyComment = async (formData) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/replycomment`,

    data: formData,
  });
  return response.data;
};

const deleteReplyComment = async (data) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/removereplycomment/${data.commentid}/${data.replyid}`,
  });
  return response.data;
};

const likeReplyComment = async (data) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/likereplycomment/${data.commentid}/${data.replyid}`,
  });
  return response.data;
};

const removeLikeReplyComment = async (data) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URL_COMMENT}/removelikereplycomment/${data.commentid}/${data.replyid}`,
  });
  return response.data;
};

const getUserById = async (id) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/get-user-by-id/${id}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data;
};

const postsService = {
  getAllPost,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  commentPost,
  removeCommentPost,
  getAllComments,
  likeComment,
  rmLikeComment,
  addReplyComment,
  deleteReplyComment,
  likeReplyComment,
  removeLikeReplyComment,
  getUserById,
};

export default postsService;
