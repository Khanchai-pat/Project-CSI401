import mongoose from "mongoose"

const empSchema = new mongoose.Schema({
    empID: String,
    empName: String,
    department: String,
    cardID: String,
    email: String,
    tel: String,
    role: String,
    firstTrainingDate: Date,
    expiryDate: Date,
    nextExpiryDate: String,
    empStatus: String
}, { timestamps: true })

export const employees = mongoose.model('emp', empSchema,"emp")