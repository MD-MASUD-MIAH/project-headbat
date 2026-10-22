import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { isDbConnected } from "../config/db.js";

const DEFAULT_ADMIN = {
  _id: "default_admin_01",
  name: "HeadBat Admin",
  email: "admin@headbat.com",
  role: "superadmin",
};

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "headbat_secret_key_2026_jwt_token",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// @desc Auth admin & get token
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (!isDbConnected()) {
      // In-memory authentication fallback
      const defaultEmail = (
        process.env.ADMIN_EMAIL || "admin@headbat.com"
      ).toLowerCase();
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";

      if (cleanEmail === defaultEmail && password === defaultPassword) {
        const token = generateToken(DEFAULT_ADMIN._id);
        return res.json({
          success: true,
          message: "Logged in successfully",
          token,
          admin: DEFAULT_ADMIN,
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("[Auth] Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server login error",
      error: error.message,
    });
  }
};

// @desc Get current admin profile
// @route GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  try {
    if (!isDbConnected() || !req.admin) {
      return res.json({
        success: true,
        admin: DEFAULT_ADMIN,
      });
    }

    return res.json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching admin profile",
      error: error.message,
    });
  }
};

// @desc Change admin password
// @route PUT /api/auth/password
// @access Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (!isDbConnected()) {
      return res.json({
        success: true,
        message: "Password updated successfully in memory session",
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update password",
      error: error.message,
    });
  }
};

// @desc Update admin profile
// @route PUT /api/auth/profile
// @access Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!isDbConnected()) {
      if (name) DEFAULT_ADMIN.name = name;
      if (email) DEFAULT_ADMIN.email = email;
      return res.json({
        success: true,
        message: "Profile updated successfully",
        admin: DEFAULT_ADMIN,
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email.toLowerCase().trim();

    await admin.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
