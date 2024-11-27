import mongoose from "mongoose";

const reqsSchema = new mongoose.Schema({
    reqid: String,
    empId: String,
    empName:String,
    courseID: String,
    sessionID : String,
    courseName : String,
    trainingDate : Date,
    periods : String,
    trainingHours : Number,
    trainingLocation : String,
    status: String
}, { timestamps: true });

export const courseResults = mongoose.model("courseResult", reqsSchema, "courseResult");
