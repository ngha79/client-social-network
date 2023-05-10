import axiosClient from "../axiosClient";

const API_URI = `${process.env.REACT_APP_API_URL}/auth`;

const login = async (userData) => {
  const response = await axiosClient.post(`${API_URI}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshtoken", response.data.refreshToken);
  }
  return response.data;
};

const register = async (userData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const response = await axiosClient.post(
    `${API_URI}/register`,
    userData,
    config
  );
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("token");
};

const forgotPassword = async (userData) => {
  const response = await axiosClient.post(
    `${API_URI}/forgot-password`,
    userData
  );
  return response.data;
};

const resetPassword = async ({ data, token }) => {
  const response = await axiosClient.patch(
    `${API_URI}/reset-password/${token}`,
    data
  );
  return response.data;
};
const authService = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
};

export default authService;
