import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import fileMiddleware from "./middleware/file.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { verifyToken } from "./middleware/auth.js";

const app = express();
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

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3003;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((error) => console.log(error));
