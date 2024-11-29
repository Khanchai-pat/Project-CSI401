import mongoose from "mongoose";

const enrollment = new mongoose.Schema({
    empId: String,
    courseId: String,
    sessionId: String,
    courseName:String,
    trainingDate: Date,
    periods:String,
    trainingLocation:String,
    status: String
})
export const enrollments = mongoose.model("enrollment", enrollment, "enrollment")