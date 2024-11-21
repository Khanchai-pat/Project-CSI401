import mongoose, { Schema, Document } from "mongoose";

export interface IReimbursement extends Document {
    employeeId: string;
    courseId: string;
    requestDate: Date;
    courseCost: number;
    status: "Pending" | "Approved" | "Rejected" | "Cancelled";
    approvedBy?: string;
}

const ReimbursementSchema: Schema = new Schema({
    employeeId: { type: String, required: true },
    courseId: { type: String, required: true },
    requestDate: { type: Date, required: true },
    courseCost: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Cancelled"], default: "Pending" },
    approvedBy: { type: String }
});

export default mongoose.model<IReimbursement>("Reimbursement", ReimbursementSchema);