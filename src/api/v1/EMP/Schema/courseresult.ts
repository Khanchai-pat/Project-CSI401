import mongoose from "mongoose";


const CoursesResult = new mongoose.Schema({
    // coed: { type: String, required: true }
    reqid: String,
    EmpID: String,
    courseID: String,
    sessionID : String,
    courseName : String,
    trainingDate : Date,
    completeDate  : Date,
    periods : String,
    trainingHours : Number,
    trainingLocation : String,
    status: String
});

export const coursesResults = mongoose.model("courseResults", CoursesResult, "courseResults");