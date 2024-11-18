import mongoose from "mongoose";

const reqSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    reqid: String,
    EmpID: String,
    courseID: String,
    status: String
});

export const courseResults = mongoose.model("courseResults", reqSchema, "courseResults");