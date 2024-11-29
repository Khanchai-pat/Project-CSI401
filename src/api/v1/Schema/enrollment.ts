import mongoose from "mongoose";

const enrollment = new mongoose.Schema({
<<<<<<< HEAD
  empId: String,
  courseId: String,
  empName: String,
  courseName: String,
  sessionId: String,
  registrationDate: Date,
  trainingDate: Date,
  department: String,
  completionDate: Date,
  status: String,
});
export const enrollments = mongoose.model(
  "enrollment",
  enrollment,
  "enrollment"
);
=======
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
>>>>>>> cb800d58ea91f4d7c80367f5a206b877389c1f75
