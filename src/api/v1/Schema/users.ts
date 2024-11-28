import mongoose from "mongoose";

const userChemas = new mongoose.Schema(
  {
    username: String,
    password: { type: String, required: true },
    empId: String,
    roles: String,
    status: String,
  },
  { timestamps: true }
);

export const users = mongoose.model("users", userChemas, "users");
