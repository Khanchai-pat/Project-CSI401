import mongoose from "mongoose";

const userChemas = new mongoose.Schema({
    username: String,
    password:  { type: String, required: true },
    role: String,
    status:String
}, { timestamps: true })

export const users = mongoose.model("users", userChemas, "users")