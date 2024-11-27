import mongoose from "mongoose";

const reqsSchema = new mongoose.Schema({
<<<<<<< HEAD
    reqid: String,
=======
    reqId: String,
>>>>>>> 925ac6cb90fdcde4c488e1eb03d1bcee78c99685
    empId: String,
    empName:String,
    courseId: String,
    sessionId : String,
    courseName : String,
    trainingDate : Date,
    periods : String,
    trainingHours : Number,
    trainingLocation : String,
    status: String
}, { timestamps: true });

export const courseResults = mongoose.model("courseResult", reqsSchema, "courseResult");
