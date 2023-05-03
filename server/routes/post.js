import express from "express";
import {
  getAllPosts,
  getUserPosts,
  likePost,
  updatePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//router.get("/", verifyToken, getAllPosts);

router.get("/", verifyToken, getAllPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:_id", verifyToken, updatePost);
router.patch("/:_id/like", verifyToken, likePost);

export default router;
