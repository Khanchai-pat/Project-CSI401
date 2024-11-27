import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  trainingDate: String,
  trainingLocation: String,
  periods: String,
  hours: Number,
  courseLimit: Number,
  courseLeft: Number,
  sessionId: String,
  status: String,
});

const courseSchema = new mongoose.Schema(
  {
    courseId: String,
    courseName: String,
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

// }, { timestamps: true });

export const course = mongoose.model("course", courseSchema, "course");