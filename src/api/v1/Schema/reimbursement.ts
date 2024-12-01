import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    reqId: String,
    empId: String,
    empName: String,
    department: String,
    courseId: String,
    sessionId:String,
    cardId: String,
    bankAccount:String,
    amount:Number,
    remark:String,
    status: String
}, { timestamps: true });

export const reimbursements = mongoose.model("reimbursement", refundSchema, "reimbursement");   