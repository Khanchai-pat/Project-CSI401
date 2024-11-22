import mongoose from "mongoose";


const ReimbursementSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    courseId: { type: String, required: true },
    requestDate: { type: Date, required: true },
    courseCost: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Cancelled"], default: "Pending" },
    approvedBy: { type: String }
});

export default mongoose.model("Reimbursement", ReimbursementSchema);