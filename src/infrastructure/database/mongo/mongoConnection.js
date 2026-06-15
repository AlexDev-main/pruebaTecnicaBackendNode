import mongoose from "mongoose";
import { env } from "../../config/env.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const disconnectMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error.message);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (error) => {
  console.error("Mongoose error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});