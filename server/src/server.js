import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import { seedDatabase } from "./seed.js";

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static uploads folder
const uploadDir = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadDir));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    service: "HeadBat Backend API",
    timestamp: new Date().toISOString(),
    database: {
      connected: isConnected,
      status: isConnected ? "connected" : "disconnected/pending",
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
  });
});

// Root informational endpoint
app.get("/", (req, res) => {
  res.json({
    name: "HeadBat API Server",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server and connect to DB
const startServer = async () => {
  const connected = await connectDB();
  if (connected) {
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 HeadBat Server running on http://localhost:${PORT}`);
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  MongoDB URI: ${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/headbat"}`);
    console.log(`===============================================`);
  });
};

startServer();
