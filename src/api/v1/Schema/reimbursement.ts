import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    reqId: String,
    empId: String,
    empName: String,
    department: String,
    courseId: String,
    cardId: String,
    moneyAmout : String,
    bankAccount:String,
    amount:Number,
    status: String
}, { timestamps: true });

export const reimbursements = mongoose.model("reimbursement", refundSchema, "reimbursement");   