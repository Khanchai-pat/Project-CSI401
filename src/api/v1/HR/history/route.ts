import express, { Request, Response } from "express"
import { responseData, responseError } from '../../interfaceRes/response';
import { courseRequests } from "../Schema/courseRequest"
import { courseResults } from "../Schema/courseResults"
export const history = express();


//course request approved
history.get("/course", async (req: Request, res: Response) => {
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
            const dbHistorys = await courseRequests
                .find({})
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

//course request denied
history.use("/refund", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { status }: any = req.body
    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point historyCou?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        try {
            const dbHistorys = await courseResults
                .find({})
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
