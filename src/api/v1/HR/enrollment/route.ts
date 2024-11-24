import express, { Request, Response } from "express"
import { enrollments } from "../Schema/enrollment"
import { responseData, responseError } from "../../interfaceRes/response";
import {}
export const enrollment = express()

enrollment.post("/showCourse", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["token-key"];
    const { courseId, sessionId, status } = req.body

    if (!tokenkey || !contentType) {
        const missingHeaders: responseError = {
            code: "400",
            status: "Failed",
            message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp.",
        };
        res.status(400).json(missingHeaders);
    } else {
        try {
            const dbResponse = await enrollments.find({});

            const newRespone = dbResponse.map(e => ({
                courseId: e.courseId,
                sessionId: e.sessionId
            }));
            const currenEmpCourse = await enrollments.find({
                newRespone
            })
            const reqCheckData: responseData = {
                code: "200",
                status: "Employee data retrieved successfully",
                data: currenEmpCourse,
            };
            res.status(200).json(reqCheckData);
        } catch (error) {
            console.log(error)
            const serverError: responseError = {
                code: "500",
                status: "Failed",
                message: "An error occurred while processing your request. Please try again later"
            };
            res.status(500).json(serverError);
        }
    }
});
