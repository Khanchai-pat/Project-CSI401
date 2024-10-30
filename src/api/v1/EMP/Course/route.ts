
import express, { Request, Response } from 'express'
import { responseData, responseError } from "../Model/model"
export const Register = express();

Register.post("/register", (req: Request, res: Response) => {
    const body = req.body;
    res.status(200).json({
        code: "Success-01-0001",
        status: "Sucess",
        data: {
            empId: body.empId,
            courseId: body.courseId,
            trainingDate: "19/07/2024",
            courseName: "คอมพิวเตอร์",
            TrainingLocation: "มหาวิทายาลัยศรีปทุม",
            periods: "09:00-11:30"
        },
    });
});