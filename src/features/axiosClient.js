import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = localStorage.getItem("refreshtoken");

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    axios.interceptors.response.eject(axiosClient.interceptors);
    return axios
      .request({
        url: `${process.env.REACT_APP_API_URL}/auth/refreshtoken`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: { refreshToken: refreshToken },
      })
      .then((token) => {
        localStorage.setItem("token", token.data);
        error.response.config.headers["Authorization"] = "Bearer " + token.data;
        return axios(error.response.config);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("user");
        return Promise.reject(error);
      })
      .finally();
  }
);

export default axiosClient;
