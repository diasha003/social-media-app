import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", verifyToken, createComment);
router.get("/post/:_id", verifyToken, getPostComments);
router.delete("/:id", verifyToken, deleteComment);
router.patch("/:id", verifyToken, updateComment);

export default router;
