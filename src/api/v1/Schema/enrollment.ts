import mongoose from "mongoose";

const enrollment = new mongoose.Schema({
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
