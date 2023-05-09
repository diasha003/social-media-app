import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateViewedUser,
  getAllFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.patch("/:id/view", verifyToken, updateViewedUser);
router.get("/:id", verifyToken, getUser);
router.get("/:_id/friends", verifyToken, getUserFriends);
router.patch("/:_id/:friendId", verifyToken, addRemoveFriend);
router.get("/", verifyToken, getAllFriends);

export default router;
