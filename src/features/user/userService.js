import axiosClient from "../axiosClient";

const API_URI = "/user";

const getUserByName = async (name) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/get-user-by-name/${name}`,
  });
  return response.data;
};

const getUserById = async (id) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/get-user-by-id/${id}`,
  });
  return response.data;
};

const getUserIsNotFriend = async (data) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/user-is-not-friend`,
  });
  return response.data;
};

const addFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI}/send-friend-invitation/${userId}`,
  });
  return response.data;
};

const acceptFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI}/accept-friend/${userId}`,
  });
  return response.data;
};

const deleteFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI}/delete-friend/${userId}`,
  });
  return response.data;
};

const deleteSendFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI}/delete-send-friend/${userId}`,
  });
  return response.data;
};

const deleteInvitedFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "PUT",
    url: `${API_URI}/delete-invited-friend/${userId}`,
  });
  return response.data;
};

const allFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/all-friend`,
  });
  return response.data;
};

const allSendFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/all-send-friend`,
  });
  return response.data;
};

const allInviteFriend = async (userId) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/all-invited-friend`,
  });
  return response.data;
};

const getMoreSuggestFriend = async (skip) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/more-friend?skip=${skip}`,
  });
  return response.data;
};

const getInvitedFriend = async (skip) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/invited-friend?skip=${skip}`,
  });
  return response.data;
};

const getSendFriend = async (skip) => {
  const response = await axiosClient.request({
    method: "GET",
    url: `${API_URI}/send-friend?skip=${skip}`,
  });
  return response.data;
};

const userService = {
  getUserByName,
  getUserById,
  getUserIsNotFriend,
  addFriend,
  acceptFriend,
  allFriend,
  allSendFriend,
  allInviteFriend,
  deleteFriend,
  deleteSendFriend,
  deleteInvitedFriend,
  getInvitedFriend,
  getSendFriend,
  getMoreSuggestFriend,
};

export default userService;
