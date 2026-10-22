import express from "express";
import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public: website visitors submit contact messages
router.post("/", createMessage);

// Protected: admin views and manages messages
router.get("/", protect, getMessages);
router.put("/:id", protect, updateMessageStatus);
router.delete("/:id", protect, deleteMessage);

export default router;
