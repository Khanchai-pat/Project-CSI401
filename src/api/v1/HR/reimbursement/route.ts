
import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement"

export const reimbursement = express();

reimbursement.get("/requests", async (req: Request, res: Response) => {

    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        try {
            const dbrequests = await reimbursements.find({});
            console.log(dbrequests)
            const successData: responseData = {
                code: "200",
                status: "OK",
                data: dbrequests
            }
            res.status(200).json(successData)
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
})

////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byID
reimbursement.get("/requestsId/:refID?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refID }: any = req.params

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!refID) {
            const missingRefIdError: responseError = {
                code: "400",
                status: "Failed",
                message: `Missing required refId : parameter in the request`
            };
            res.status(400).send(missingRefIdError)
        }
        else {
            try {
                const checkId = await reimbursements.findOne({ refId: refID })
                if (!checkId) {
                    const idNotFoundError: responseError = {
                        code: "404",
                        status: "Failed",
                        message: `The requested data with the provided ID ${refID} could not be found`
                    };
                    res.status(404).send(idNotFoundError)
                } else {
                    const refundRequestsById = await reimbursements.find({ refId: refID });
                    // console.log(refundRequestsById)
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: refundRequestsById
                    };
                    res.status(200).json(successData)
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
});

//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
reimbursement.post("/appoved", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!refId) {
            const missingRefIdError: responseError = {
                code: "400",
                status: "Failed",
                message: `Missing required refId : parameter in the request`
            };
            res.status(400).send(missingRefIdError)
        } else {
            try {
                const checkId = await reimbursements.findOne({ refId: refId })
                if (!checkId) {
                    const idNotFoundError: responseError = {
                        code: "404",
                        status: "Failed",
                        message: `The requested data with the provided ID : ${refId} could not be found`
                    };
                    res.status(404).send(idNotFoundError)
                } else {
                    const dbAppove = await reimbursements.updateOne({ refId: refId }, {
                        $set: {
                            status: status
                        }
                    });
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: dbAppove
                    };
                    res.status(200).json(successData)
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
}
);

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
reimbursement.post("/denied", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!refId) {
            const missingRefIdError: responseError = {
                code: "400",
                status: "Failed",
                message: `Missing required refId : parameter in the request`
            };
            res.status(400).send(missingRefIdError)
        } else {
            try {
                const checkId = await reimbursements.findOne({ refId: refId })
                if (!checkId) {
                    const idNotFoundError: responseError = {
                        code: "404",
                        status: "Failed",
                        message: `The requested data with the provided ID : ${refId} could not be found`
                    };
                    res.status(404).send(idNotFoundError)
                } else {
                    const dbAppove = await reimbursements.updateOne({ refId: refId }, {
                        $set: {
                            status: status
                        }
                    });
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: dbAppove
                    };
                    res.status(200).json(successData)
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
});
