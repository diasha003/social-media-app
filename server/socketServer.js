import jwt from "jsonwebtoken";
let users = [];

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
  //const userId = socket.verified.userId;
  const { userId, firstName, lastName, picturePath } = socket.verified;
  users.push({ userId, socketId: socket.id });
  console.log(userId, firstName, lastName, picturePath);

  socket.on("send-message", (recipientUserId, user, content) => {
    const recipient = users.find((user) => user.userId === recipientUserId);
    if (recipient) {
      socket
        .to(recipient.socketId)
        .emit(
          "receive-message",
          userId,
          firstName,
          lastName,
          picturePath,
          content
        );
    }
  });

  socket.on("disconnect", (socket) => {
    users = users.filter((user) => user.userId !== userId);
  });
};
