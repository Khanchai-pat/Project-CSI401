import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    reqId: String,
    empID: String,
    empName: String,
    department: String,
    courseID: String,
    cardID: String,
    MoneyAmout : String,
    bankAccount:String,
    amount:Number,
    status: String
}, { timestamps: true });

export const refund = mongoose.model("reimbursement", refundSchema, "reimbursement");   