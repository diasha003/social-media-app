import express from "express";
import { info, login } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/info", verifyToken, info);

export default router;
