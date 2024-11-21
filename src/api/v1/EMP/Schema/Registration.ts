import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
    employeeId: string;
    courseId: string;
    courseName: string;
    periods: string;
    registrationDate: Date;
}

const RegistrationSchema: Schema = new Schema({
    employeeId: { type: String, required: true },
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    periods: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
});

export default mongoose.model<IRegistration>("Registration", RegistrationSchema);