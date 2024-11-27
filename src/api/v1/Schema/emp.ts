import mongoose from "mongoose"

const empSchema = new mongoose.Schema({
    empId: String,
    empName: String,
<<<<<<< HEAD
    department: String,
=======
    departMent: String,
>>>>>>> 925ac6cb90fdcde4c488e1eb03d1bcee78c99685
    cardId: String,
    email: String,
    tel: String,
    role: String,
    firstTrainingDate: Date,
    expiryDate: Date,
    nextExpiryDate: String,
    status: String
}, { timestamps: true })

export const employees = mongoose.model('emp', empSchema, "emp")