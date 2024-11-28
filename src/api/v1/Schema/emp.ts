import mongoose from "mongoose"

const empSchema = new mongoose.Schema({
    empId: String,
    empName: String,
    department: String,
    cardId: String,
    email: String,
    tel: String,
    roles: String,
    firstTrainingDate: Date,
    expiryDate: Date,
    nextExpiryDate: String,
    status: String
}, { timestamps: true })

export const employees = mongoose.model('emp', empSchema, "emp")