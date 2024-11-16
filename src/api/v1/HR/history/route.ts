import express, { Request, Response } from "express"
import { responseData, responseError } from "../model/model"
import mongoose, { Schema } from "mongoose"

export const history = express();

const historySchema = new mongoose.Schema({
    // requestId
    requestId: String,
    // empId
    firstName: String,
    // status
    lastName: String,
    // reqDate
    updatedAt: Date

    // requestType: { type: String, required: true },
    // requestDate: { type: Date, required: true },
    // status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    // approvalDate: { type: Date },
    // approverId: { type: String },
    // comments: { type: String },
    // attachmentUrl: { type: String },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
const historys = mongoose.model("history", historySchema)

history.use("/course", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point historyCourse`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        try {
            const dbHistorys = await historys.find({})
            const successData: responseData = {
                code: '200',
                status: 'OK',
                data: dbHistorys
            }
            res.status(200).json(successData)
        } catch (error) {
            console.log(error)
            const errorServer: responseError = {
                message: `Server error`
            }
            res.status(500).send(errorServer)
        }
    }
})


history.use("/approved", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point historyCou?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        try {
            const dbHistorys = await historys.find({})
            const successData: responseData = {
                code: '200',
                status: 'OK',
                data: dbHistorys
            }
            res.status(200).json(successData)
        } catch (error) {
            console.log(error)
            const errorServer: responseError = {
                message: `Server error`
            }
            res.status(500).send(errorServer)
        }
    }
})
