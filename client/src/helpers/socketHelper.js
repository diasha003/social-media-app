import { io } from "socket.io-client";

export let socket;

export const initiateSocketConnection = (isAuth) => {
  if (isAuth) {
    socket = io("http://localhost:3001/", {
      auth: {
        token: isAuth,
      },
    });
  }
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
