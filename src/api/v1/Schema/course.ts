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

// const dbResults = await course.find({ courseId: "C001" });
// const filteredResults = dbResults.map((course) => ({
//   courseId: course.courseId,
//   courseName: course.courseName,
//   sessions: course.sessions.filter(
//     (session) => session.sessionId === "S002"
//   ),
// }));

export const course = mongoose.model("course", courseSchema, "course");
