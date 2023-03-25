import axiosClient from "../axiosClient";

const API_URI_CHAT = "/chat";
const API_URI_MESSAGE = "/message";

const getAllChat = async (userId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI_CHAT}/${userId}`,
  });
  return response.data;
};

const getChatByMember = async (userId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI_CHAT}/memberId/${userId}`,
  });
  return response.data;
};

const createChat = async (formData) => {
  const response = await axiosClient.request({
    method: "POST",
    url: `${API_URI_CHAT}/`,
    data: formData,
  });
  console.log(response.data);
  return response.data;
};

const getMessages = async (chatId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI_MESSAGE}/${chatId}`,
  });
  return response.data;
};

const createMessage = async (formData) => {
  const response = await axiosClient.request({
    method: "POST",
    url: `${API_URI_MESSAGE}/`,

    data: formData,
  });
  return response.data;
};

const deleteMessage = async (messageId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_MESSAGE}/${messageId}`,
  });
  return response.data;
};

const likeMessage = async (messageId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_MESSAGE}/like/${messageId}`,
  });
  return response.data;
};

const removeLikeMessage = async (messageId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_MESSAGE}/removelike/${messageId}`,
  });
  return response.data;
};

const kickMemberChat = async ({ chatId, memberId }) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_CHAT}/${chatId}/${memberId}`,
  });
  return response.data;
};

const addMemberChat = async ({ memberId, chatId }) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_CHAT}/add/${chatId}`,
    data: {
      memberId,
    },
  });
  return response.data;
};
const outChat = async ({ chatId }) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_CHAT}/out/${chatId}`,
  });
  return response.data;
};
const passLeaderChat = async ({ chatId, memberId }) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI_CHAT}/leader/${chatId}/${memberId}`,
  });
  return response.data;
};

const deleteChat = async ({ chatId }) => {
  const response = await axiosClient.request({
    method: "DELETE",
    url: `${API_URI_CHAT}/${chatId}`,
  });
  return response.data;
};

const chatService = {
  getAllChat,
  createChat,
  getChatByMember,
  getMessages,
  createMessage,
  deleteMessage,
  likeMessage,
  removeLikeMessage,
  kickMemberChat,
  addMemberChat,
  outChat,
  passLeaderChat,
  deleteChat,
};

export default chatService;
