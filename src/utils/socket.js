import { io } from "socket.io-client";

export let socket = io("https://mernappsocialmedia.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});
