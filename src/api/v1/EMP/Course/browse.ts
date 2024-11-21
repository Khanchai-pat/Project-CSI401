import express, { Request, Response } from "express";
import Course, { ICourse } from "../Schema/courseschema";

export const browse = express();


const verifyToken = (token: string | undefined): boolean => {
    const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    return token === validToken;
};


browse.get("/course/list", async (req: Request, res: Response) => {
    const token = req.headers["token-key"] as string;

    if (!verifyToken(token)) {
        return res.status(401).json({
            code: "401",
            status: "error",
            message: "Unauthorized",
        });
    }

    try {
        const limit = parseInt(req.query.limit as string) || 10; 
        const offset = parseInt(req.query.offset as string) || 0; 

       
        const courses = await Course.find()
            .skip(offset)
            .limit(limit);

        res.status(200).json({
            code: "200",
            status: "success",
            message: "Data Received Successfully",
            data: courses,
        });
    } catch (err) {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Receive Data",
        });
    }
});