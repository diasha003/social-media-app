import express from "express";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", verifyToken, sendMessage);
router.get("/", verifyToken, getConversations);
router.get("/:id", verifyToken, getMessages);

export default router;
