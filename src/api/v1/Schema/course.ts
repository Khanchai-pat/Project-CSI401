import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    courseId: String,
    courseName: String,
    sessionId: String,
    trainingDate: String,
    trainingLocation: String,
    periods: String,
    hours: String,
    maxSeats: String,
    courseLimit: String,
    courseLeft: String,


}, { timestamps: true });

export const course = mongoose.model("course", courseSchema, "course");