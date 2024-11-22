import mongoose from "mongoose";

const userChemas = new mongoose.Schema({
    email: String,
    cardID: String,
    role: String,
}, { timestamps: true })

export const users = mongoose.model("users", userChemas, "users")