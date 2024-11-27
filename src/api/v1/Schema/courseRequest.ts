import mongoose from "mongoose";

const reqSchema = new mongoose.Schema(
  {
    // coed: { type: String, required: true }
    reqId: String,
    empId: String,
    sessionID: String,
    courseID: String,
    status: String,
  },
  { timestamps: true }
);

export const courseRequests = mongoose.model(
  "courseRequest",
  reqSchema,
  "courseRequest"
);