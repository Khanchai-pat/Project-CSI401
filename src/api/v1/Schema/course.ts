import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    courseId: String,
    courseName: String,
    trainingDate: String,
    trainingLocation: String,
    hours: String,
    maxSeats: String
}, { timestamps: true });

export const course = mongoose.model("course", courseSchema, "course");