import mongoose, { Schema, Document } from "mongoose";


export interface ICourse extends Document {
    courseID: string;
    courseName: string;
    periods: string;
    traininghours: number;
    courseLimit: number;
    courseLeft: number;
}


const CourseSchema: Schema = new mongoose.Schema({
    courseID: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    periods: { type: String, required: true },
    courseLimit: { type: Number, required: true },
    traininghours : { type: Number, required: true },
    courseLeft: { type: Number, required: true }
});


export default mongoose.model<ICourse>("Course", CourseSchema);