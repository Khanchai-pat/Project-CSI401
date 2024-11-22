import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
    courseID: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    periods: { type: String, required: true },
    courseLimit: { type: Number, required: true },
    traininghours : { type: Number, required: true },
    courseLeft: { type: Number, required: true }
});


export default mongoose.model("Course", CourseSchema);