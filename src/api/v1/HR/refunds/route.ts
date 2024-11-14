
import express, { Request, Response } from "express";
import { responseData, responseError } from "../model/model";
import mongoose from "mongoose";

export const refunds = express();

//creat Schema
const refundSchema = new mongoose.Schema({
    code: String,
    firstName: String,
    lastName: String
})

//defiled Model
const Refunds = mongoose.model('fees', refundSchema)

//1.2.11 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show  List 
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
            const dbrequests = await Refunds.find({});
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
refunds.get("/requestsId/:id?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { id }: any = req.params
    console.log(` This is id ${id}`)

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: `Missing requried herder : contentType and tokenkey EndPoint refunds Get requestId`
        }
        res.status(400).send(verifyError)
    } else {
        if (!id) {
            const reqIdError: responseError = {
                message: `Missing ID Param`
            }
            res.status(400).send(reqIdError)
        }
        else {
            try {
                const dbrequestsId = await Refunds.find({ _id: id })
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
refunds.post("/appove", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { reqId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point appove:id?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        if (!reqId) {
            const errorBodyid: responseError = {
                message: `Missing requirDed body id`
            }
            res.status(400).send(errorBodyid)
        } else {
            try {
                // const cerrenData = await Refunds.findById({ _id: reqId })
                const dbappove = await Refunds.updateOne({ _id: reqId },
                    {
                        $set: {
                            lastName: status
                        }
                    }
                );
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

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
refunds.post("/reject", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { reqId, status }: any = req.body

    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point appove:id?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        if (!reqId) {
            const errorBodyid: responseError = {
                message: `Missing requirDed body id`
            }
            res.status(400).send(errorBodyid)
        } else {
            try {
                // const cerrenData = await Refunds.findById({ _id: reqId })
                const dbappove = await Refunds.updateOne({ _id: reqId },
                    {
                        $set: {
                            lastName: status
                        }
                    }
                );
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
