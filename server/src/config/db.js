import mongoose from "mongoose";

// Disable command buffering so queries fail-fast or fallback immediately when DB is not ready
mongoose.set("bufferCommands", false);

export const isDbConnected = () => mongoose.connection.readyState === 1;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/headbat";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log(
      `[MongoDB] Connected successfully to host: ${conn.connection.host} / database: ${conn.connection.name}`
    );
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Connection notice: ${error.message}`);
    console.warn(
      `[MongoDB] Operating in graceful in-memory mode until MongoDB is started at ${uri}`
    );
    return false;
  }
};
