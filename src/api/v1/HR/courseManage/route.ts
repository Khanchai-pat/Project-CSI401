import express, { Response, Request } from "express"
import { responseData, responseError } from "../../interfaceRes/response";
import mongoose from "mongoose";
import { course } from "../../Schema/course"


export const courses = express();

courses.post("/createCourse", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    const {
        courseId,
        courseName,

    }: any = req.body

    if (contentType !== 'application/json' || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);

    } else {
        if (!courseId ||
            !courseName
        ) {
            const incompleteDataError: responseError = {
                code: "400",
                status: "Failed",
                message: "Incomplete data provided. Please ensure all required fields are filled in"
            };
            res.status(400).json(incompleteDataError);
        } else {
            try {
                const currentData = await course.findOne({
                    $or: [
                        { courseId: courseId },
                        { courseName: courseName },
                    ]
                })
                if (!currentData) {
                    const addCourse = await course
                        .create({
                            courseId: courseId,
                            courseName: courseName,
                        }
                        )
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: {
                            addCourse,
                        }
                    }
                    res.status(200).json(successData)
                } else {
                    const duplicateDataError: responseError = {
                        code: "400",
                        status: "Failed",
                        message: "Duplicate data found. The provided employee information already exists in the system"
                    };
                    res.status(400).json(duplicateDataError);
                }
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
    }
})


courses.post("/createCourse", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const {
        sessionId,
        trainingDate,
        trainingLocation,
        periods,
        hours,
        courseLimit,
        courseLeft,
        status, }: any = req.body

    if (contentType !== 'application/json' || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);

    } else {
        if (
            !sessionId ||
            !trainingDate ||
            !trainingLocation ||
            !periods ||
            !hours ||
            !courseLimit ||
            !courseLeft ||
            !status
        ) {
            const incompleteDataError: responseError = {
                code: "400",
                status: "Failed",
                message: "Incomplete data provided. Please ensure all required fields are filled in"
            };
            res.status(400).json(incompleteDataError);
        } else {

        }
    }
})