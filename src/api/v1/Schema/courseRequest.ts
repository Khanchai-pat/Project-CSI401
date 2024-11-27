import mongoose from "mongoose";

const reqSchema = new mongoose.Schema(
  {
    // coed: { type: String, required: true }
    reqId: String,
    empId: String,
<<<<<<< HEAD
    sessionID: String,
    courseID: String,
=======
    sessionId: String,
    courseId: String,
>>>>>>> 925ac6cb90fdcde4c488e1eb03d1bcee78c99685
    status: String,
  },
  { timestamps: true }
);

export const courseRequests = mongoose.model(
  "courseRequest",
  reqSchema,
  "courseRequest"
);