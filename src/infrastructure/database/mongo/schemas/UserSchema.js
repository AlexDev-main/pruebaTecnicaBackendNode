import mongoose from "mongoose";
import { ROLES } from "../../../../domain/constants/roles.js";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: Object.values(ROLES),
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);