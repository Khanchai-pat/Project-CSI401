import express, { Request, Response } from "express"
import { enrollments } from "../../Schema/enrollment"
import { responseData, responseError } from "../../interfaceRes/response";
export const enrollment = express()

enrollment.get("/showEnrollment", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["token-key"];

    if (!tokenkey || !contentType) {
        const missingHeaders: responseError = {
            code: "400",
            status: "Failed",
            message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp"
        };
        res.status(400).json(missingHeaders);
    } else {
        try {
            const enrollment = await enrollments.find({});
            const currentEnrollments: responseData = {
                code: "200",
                status: "Employee data retrieved successfully",
                data: enrollment,
            };
            res.status(200).json(currentEnrollments);
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


enrollment.post("/approved", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["token-key"];
    const { empId, courseId, sessionId }: any = req.body

    if (!tokenkey || !contentType) {
        const missingHeaders: responseError = {
            code: "400",
            status: "Failed",
            message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp"
        };
        res.status(400).json(missingHeaders);
    } else {
        try {
            const checkEnrollment = await enrollments
                .findOne({ empId: empId });
            if (!checkEnrollment) {
                const missingId: responseError = {
                    code: "404",
                    status: "Failed",
                    message: `The provided '${empId}' empId does not match any enrollment record in the database.`

                };
                res.status(404).json(missingId);
            } else {
                if (!empId || !courseId || !sessionId) {
                    const incompleteData: responseError = {
                        code: "400",
                        status: "Failed",
                        message: "Incomplete data provided. Please ensure all required fields are filled in"
                    };
                    res.status(404).json(incompleteData);
                } else {
                    if (checkEnrollment.courseId !== courseId) {
                        const missingCourseId: responseError = {
                            code: "404",
                            status: "Failed",
                            message: `with Id '${courseId}' courseId  not found checkEnrollment`,
                        };
                        res.status(404).json(missingCourseId);
                    } else {
                        if (checkEnrollment.sessionId !== sessionId) {
                            const missingSessionId: responseError = {
                                code: "404",
                                status: "Failed",
                                message: `with Id '${sessionId}' sessionId not found checkEnrollment`,
                            };
                            res.status(404).json(missingSessionId);
                        } else {

                            const updateStatus = await enrollments.updateOne({ empId: empId, courseId: courseId, sessionId: sessionId },
                                {
                                    $set: {
                                        status: "approved"
                                    }
                                }
                            )
                            const currentEnrollments: responseData = {
                                code: "200",
                                status: "Employee data retrieved successfully",
                                data: updateStatus,
                            };
                            res.status(200).json(currentEnrollments);
                        }
                    }
                }
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
});



enrollment.post("/denied", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["token-key"];
    const { empId, courseId, sessionId }: any = req.body

    if (!tokenkey || !contentType) {
        const missingHeaders: responseError = {
            code: "400",
            status: "Failed",
            message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp"
        };
        res.status(400).json(missingHeaders);
    } else {
        try {
            const checkEnrollment = await enrollments
                .findOne({ empId: empId });
            if (!checkEnrollment) {
                const missingId: responseError = {
                    code: "404",
                    status: "Failed",
                    message: `The provided '${empId}' empId does not match any enrollment record in the database.`

                };
                res.status(404).json(missingId);
            } else {
                if (!empId || !courseId || !sessionId) {
                    const incompleteData: responseError = {
                        code: "400",
                        status: "Failed",
                        message: "Incomplete data provided. Please ensure all required fields are filled in"
                    };
                    res.status(404).json(incompleteData);
                } else {
                    if (checkEnrollment.courseId !== courseId) {
                        const missingCourseId: responseError = {
                            code: "404",
                            status: "Failed",
                            message: `with Id '${courseId}' courseId  not found checkEnrollment`,
                        };
                        res.status(404).json(missingCourseId);
                    } else {
                        if (checkEnrollment.sessionId !== sessionId) {
                            const missingSessionId: responseError = {
                                code: "404",
                                status: "Failed",
                                message: `with Id '${sessionId}' sessionId not found checkEnrollment`,
                            };
                            res.status(404).json(missingSessionId);
                        } else {

                            const updateStatus = await enrollments.updateOne({ empId: empId, courseId: courseId, sessionId: sessionId },
                                {
                                    $set: {
                                        status: "denied"
                                    }
                                }
                            )
                            const currentEnrollments: responseData = {
                                code: "200",
                                status: "Employee data retrieved successfully",
                                data: updateStatus,
                            };
                            res.status(200).json(currentEnrollments);
                        }
                    }
                }
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
});