import express, { Request, Response } from 'express'
import { responseData, responseError } from "../Model/model"
export const browse = express();

const courses = [
    {
        courseID: "ABC100",
        courseName: "เตรียมความพร้อมสู่การทำงาน EP2.2",
        periods: "09:00-10:40",
        courseLimit: 50,
        courseLeft: 15
    },

];


const verifyToken = (token: string | undefined): boolean => {
    const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    return token === validToken;
};


browse.get('/course/list', async (req: Request, res: Response) => {

    const token = req.headers['token-key'] as string;


    if (!verifyToken(token)) {
        res.status(401).json({
            code: "401",
            status: "error",
            message: "Unauthorized"
        });
    }


    const limit = parseInt(req.query.limit as string) || 10;  // Default: 10
    const offset = parseInt(req.query.offset as string) || 0;  // Default: 0


    const pagedCourses = courses.slice(offset, offset + limit);


        res.status(200).json({
        code: "200",
        status: "success",
        message: "Data Received Successfully",
        data: pagedCourses
    });
});