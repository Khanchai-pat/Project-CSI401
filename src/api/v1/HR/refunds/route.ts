
import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { refund } from "../Schema/refund"

export const refunds = express();

refunds.get("/requests", async (req: Request, res: Response) => {

    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: `Missing reurie hearder : content-type and tonken-key End Point Refunds Get requests`
        }
        res.status(400).send(verifyError)
    } else {
        try {
            const dbrequests = await refund.find({});
            console.log(dbrequests)
            const successData: responseData = {
                code: "200",
                status: "OK",
                data: dbrequests
            }
            res.status(200).json(successData)
        } catch (error) {
            console.log(error)
            const errorData: responseError = {
                message: `This ID cannot be found in the database ${error}`
            }
            res.status(500).send(errorData)
        }
    }
})

////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byID
refunds.get("/requestsId/:refId?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refId }: any = req.params

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: `Missing requried herder : contentType and tokenkey EndPoint refunds Get requestId`
        }
        res.status(400).send(verifyError)
    } else {
        if (!refId) {
            const reqIdError: responseError = {
                message: `Missing ID Param`
            }
            res.status(400).send(reqIdError)
        }
        else {
            try {
                const dbrequestsId = await refund.find({ refId: refId })
                console.log(dbrequestsId)
                const suuccessData: responseData = {
                    code: "200",
                    status: "OK",
                    data: dbrequestsId
                }
                res.status(200).json(suuccessData)
            } catch (error) {
                console.log(error)
                const errorServer: responseError = {
                    message: `This ID cannot be found in the database ${error}`
                }
                res.status(500).send(errorServer)
            }
        }
    }
});

//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
refunds.post("/appovede", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point appove:id?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        if (!refId) {
            const errorBodyid: responseError = {
                message: `Missing requirDed body id`
            }
            res.status(400).send(errorBodyid)
        } else {
            const checkData = await refund.findOne({ refId: refId })
            if (!checkData) {
                const errorBodyid: responseError = {
                    message: `ไม่พบไอดีนี้`
                }
                res.status(400).send(errorBodyid)
            } else {
                try {
                    // const cerrenData = await Refunds.findById({ _id: reqId })
                    const dbappove = await refund.updateOne({ refId: refId }, req.body);
                    res.status(200).json(dbappove)
                } catch (errer) {
                    console.log(errer)
                    const errorServer: responseError = {
                        message: `Can not Appove Data by id`
                    }
                    res.status(500).send(errorServer)
                }
            }
        }
    }
});

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
refunds.post("/denied", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { refId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point appove:id?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        if (!refId) {
            const errorBodyid: responseError = {
                message: `Missing requirDed body id`
            }
            res.status(400).send(errorBodyid)
        } else {
            try {
                // const cerrenData = await Refunds.findById({ _id: reqId })
                const dbappove = await refund.updateOne({ refId: refId }, req.body);
                res.status(200).json(dbappove)
            } catch (errer) {
                console.log(errer)
                const errorServer: responseError = {
                    message: `Can not Appove Data by id`
                }
                res.status(500).send(errorServer)
            }
        }
    }
});
