import mongoose from "mongoose";

const reqsSchema = new mongoose.Schema(
  {
    reqId: String,
    empId: String,
    empName: String,
    courseId: String,
    sessionId: String,
    courseName: String,
    department: String,
    trainingDate: Date,
    periods: String,
    trainingHours: Number,
    trainingLocation: String,
    vertifier:String,
    status: String,
  },
  { timestamps: true }
);

export const courseResults = mongoose.model(
  "courseResult",
  reqsSchema,
  "courseResult"
);
