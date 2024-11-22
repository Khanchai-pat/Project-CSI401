import mongoose, { Schema, Document } from "mongoose";

export interface ICourseResult extends Document {
    employeeId: string;
    employeeName: string;
    courseId: string;
    courseName: string;
    periods: string;
    status: string; // เช่น "Pass", "Fail"
}

const CourseResultSchema: Schema = new Schema({
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    periods: { type: String, required: true },
    status: { type: String, required: true },
});

export default mongoose.model<ICourseResult>("CourseResult", CourseResultSchema);