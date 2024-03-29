import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { register } from "./controllers/auth.js";
import { createPost, updatePost } from "./controllers/post.js";
import fileMiddleware from "./middleware/file.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import messageRoutes from "./routes/message.js";
import commentsRoutes from "./routes/comment.js";
import { verifyToken } from "./middleware/auth.js";
import { updateUser } from "./controllers/users.js";
import http from "http";
import { Server } from "socket.io";
import { authSocket, socketServer } from "./socketServer.js";

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(__dirname));
app.use("/assets", express.static(path.join(__dirname, "assets")));
dotenv.config();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.post("/auth/register", fileMiddleware.single("picture"), register);
app.post("/posts", verifyToken, fileMiddleware.single("picture"), createPost);
app.patch(
  "/users/:id",
  verifyToken,
  fileMiddleware.single("picture"),
  updateUser
);
app.patch(
  "/posts/:_id",
  verifyToken,
  fileMiddleware.single("picture"),
  updatePost
);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 3003;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((error) => console.log(error));
