import { io } from "socket.io-client";

export let socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});
