import express from "express";
import {
  getAllContent,
  getSectionContent,
  updateSectionContent,
  resetSectionContent,
} from "../controllers/contentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllContent);
router.get("/all", getAllContent);
router.get("/:section", getSectionContent);

// Protected routes (Admin only)
router.put("/:section", protect, updateSectionContent);
router.post("/:section/reset", protect, resetSectionContent);

export default router;
