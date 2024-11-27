import mongoose from "mongoose";

const reqSchema = new mongoose.Schema(
  {
    // coed: { type: String, required: true }
    reqId: String,
    empId: String,
    sessionId: String,
    courseId: String,
    status: String,
  },
  { timestamps: true }
);

export const courseRequests = mongoose.model("withdrawRequest", reqSchema,
  "withdrawRequest"
);