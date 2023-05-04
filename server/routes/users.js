import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:_id/friends", verifyToken, getUserFriends);
router.patch("/:_id/:friendId", verifyToken, addRemoveFriend);
//router.patch("/:id", verifyToken, updateUser);

export default router;
