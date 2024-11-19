import express, { Request, Response } from "express"
import { responseData, responseError } from "../../interfaceRes/response"
import { courseRequests } from "../Schema/courseRequest"
import { courseResults } from "../Schema/courseResults"

export const dashBoard = express();

dashBoard.get("/dashBoard", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: string = reqHeader["authorization"];

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: "missing quried header : contentType And tokenKey"
        }
        res.status(400).json(verifyError)
    } else {
        try {
            const courseRequest = await courseResults.find({})
            console.log(courseRequest)
            const successData: responseData = {
                code: '200',
                status: 'OK',
                data: courseRequest
            }
            res.status(200).json(successData)
        } catch (error) {
            console.log(error)
            const errorServer: responseError = {
                message: "server Error"
            }
            res.status(500).json(errorServer)
        }
    }
})