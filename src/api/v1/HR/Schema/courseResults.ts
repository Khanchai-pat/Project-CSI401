import mongoose from "mongoose";

const reqsSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    reqid: String,
    EmpID: String,
    courseID: String,
    status: String
}, { timestamps: true });

export const courseResults = mongoose.model("courseResult", reqsSchema, "courseResult");