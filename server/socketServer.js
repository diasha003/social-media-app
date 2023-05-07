import jwt from "jsonwebtoken";

export const authSocket = (socket, next) => {
  let token = socket.handshake.auth.token;

  if (!token) {
    return res.status(403).json({ message: "Access Denied" });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);
      socket.verified = verified;
      next();
    } catch (err) {
      res.status(403).json({ message: "Access Denied" });
    }
  }
};

export const socketServer = (socket) => {
  //console.log(socket);

  socket.on("send-message", () => {
    //console.log("1111");
  });
};
