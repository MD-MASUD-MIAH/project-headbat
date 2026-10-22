import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { isDbConnected } from "../config/db.js";

const DEFAULT_ADMIN = {
  _id: "default_admin_01",
  name: "HeadBat Admin",
  email: "admin@headbat.com",
  role: "superadmin",
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "headbat_secret_key_2026_jwt_token"
      );

      // 1. Handle default/demo token seamlessly whether DB is connected or not
      if (decoded.id === DEFAULT_ADMIN._id) {
        if (isDbConnected()) {
          const seededAdmin = await Admin.findOne({
            email: (process.env.ADMIN_EMAIL || "admin@headbat.com").toLowerCase(),
          }).select("-password");
          req.admin = seededAdmin || DEFAULT_ADMIN;
        } else {
          req.admin = DEFAULT_ADMIN;
        }
        return next();
      }

      // 2. If DB is not connected, fallback to default admin
      if (!isDbConnected()) {
        req.admin = DEFAULT_ADMIN;
        return next();
      }

      // 3. If ID is not a 24-character ObjectId, find admin by email
      if (!decoded.id || !decoded.id.match(/^[0-9a-fA-F]{24}$/)) {
        const adminByEmail = await Admin.findOne({
          email: (process.env.ADMIN_EMAIL || "admin@headbat.com").toLowerCase(),
        }).select("-password");
        if (adminByEmail) {
          req.admin = adminByEmail;
          return next();
        }
        return res.status(401).json({
          success: false,
          message: "Not authorized, admin account not found",
        });
      }

      // 4. Standard MongoDB lookup
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) {
        const fallbackAdmin = await Admin.findOne().select("-password");
        if (fallbackAdmin) {
          req.admin = fallbackAdmin;
          return next();
        }
        return res.status(401).json({
          success: false,
          message: "Not authorized, admin account not found",
        });
      }

      return next();
    } catch (error) {
      console.error("[Auth] Token verification failed:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid or expired token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};
