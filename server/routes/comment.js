import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", verifyToken, createComment);
router.get("/post/:_id", verifyToken, getPostComments);
router.delete("/:id", verifyToken, deleteComment);

export default router;
