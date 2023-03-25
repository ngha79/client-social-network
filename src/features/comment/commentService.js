import axiosClient from "../axiosClient";

const API_URL_COMMENT = "/comment";

const getAllComments = async (postId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URL_COMMENT}/getAllComment/${postId}`,
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

const commentsService = {
  commentPost,
  getAllComments,
};

export default commentsService;
