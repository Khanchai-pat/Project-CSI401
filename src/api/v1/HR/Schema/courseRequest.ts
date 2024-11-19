import mongoose from "mongoose";

const reqSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    reqId: String,
    EmpID: String,
    courseID: String,
    pending: String
}, { timestamps: true });

export const courseRequests = mongoose.model("courseRequest", reqSchema, "courseRequest");