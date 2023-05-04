import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateViewedUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.patch("/:id/view", verifyToken, updateViewedUser);
router.get("/:id", verifyToken, getUser);
router.get("/:_id/friends", verifyToken, getUserFriends);
router.patch("/:_id/:friendId", verifyToken, addRemoveFriend);

export default router;
