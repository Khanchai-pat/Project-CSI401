import mongoose from "mongoose";

const reqSchema = new mongoose.Schema(
  {
    // coed: { type: String, required: true }
    reqId: String,
    empId: String,
    empName:String,
    sessionId: String,
    courseId: String,
    department:String,
    remark:String,
    status: String,
  },
  { timestamps: true }
);

export const courseRequests = mongoose.model("withdrawRequest", reqSchema,
  "withdrawRequest"
);