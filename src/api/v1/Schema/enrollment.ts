import mongoose from "mongoose";

const enrollment = new mongoose.Schema({
    empId: String,
    courseId: String,
    sessionId: String,
    status: String
}, { timestamps: true })
export const enrollments = mongoose.model("enrollment", enrollment, "enrollment")