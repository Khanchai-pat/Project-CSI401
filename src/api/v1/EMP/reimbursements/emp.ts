import mongoose, { Schema, Document } from "mongoose";

export interface emp extends Document {
    employeeId: string;
    name: string;
    department: string;
    email: string;
    requestYear?: number;
}

const EmpSchema: Schema = new Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    requestYear: { type: Number }
});

export default mongoose.model<emp>("Emp", EmpSchema);