import mongoose from "mongoose";

const enrollment = new mongoose.Schema({
    empId: String,
    courseId: String,
    sessionId: String,
    registrationDate: Date,
    trainingDate: Date,
    status: String
})
export const enrollments = mongoose.model("enrollment", enrollment, "enrollment")