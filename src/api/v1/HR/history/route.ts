import express, { Request, Response } from "express"
import { responseData, responseError } from '../../interfaceRes/response';
import mongoose, { Schema } from "mongoose"
import { courseRequests } from "../Schema/courseRequest"
export const history = express();

history.use("/approved", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { status }: any = req.body
    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point historyCourse`
        }
        res.status(400).send(errorHeaderToken)
    } else {

        try {
            const dbHistorys = await courseRequests
                .find({ Status: status })
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


history.use("/approveds", async (req: Request, res: Response) => {
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
            const dbHistorys = await courseRequests.find({ status: "A" })
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
