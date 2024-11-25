import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    reqId: String,
    empID: String,
    courseID: String,
    cardID:String,
    bankAccount:String,
    amount:Number,
    status: String
}, { timestamps: true });

export const refund = mongoose.model("reimbursement", refundSchema, "reimbursement");   