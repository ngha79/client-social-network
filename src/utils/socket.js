import { io } from "socket.io-client";

export let socket = io(process.env.REACT_APP_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});
