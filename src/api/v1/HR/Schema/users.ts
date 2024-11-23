import mongoose from "mongoose";

const userChemas = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
}, { timestamps: true })

export const users = mongoose.model("users", userChemas, "users")