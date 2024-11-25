import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    // coed: { type: String, required: true }
    reqId: String,
    EmpID: String,
    courseID: String,
    status: String
}, { timestamps: true });

export const refund = mongoose.model("reimbursement", refundSchema, "reimbursement");   