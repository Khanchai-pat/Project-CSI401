import mongoose from "mongoose"

const empSchema = new mongoose.Schema({
    empId: String,
    empName: String,
    departMent: String,
    cardId: String,
    email: String,
    tel: String,
    role: String,
    firstTrainingDate: Date,
    expiryDate: Date,
    nextExpiryDate: String,
    empStatus: String
}, { timestamps: true })

export const employees = mongoose.model('emp', empSchema,"emp")