import express, { Request, Response } from "express"
import { responseData, responseError } from '../../interfaceRes/response';
import { courseRequests } from "../../Schema/courseRequest"
import { courseResults } from "../../Schema/courseResults"
import { reimbursements } from "../../Schema/reimbursement"
export const history = express();


//course request approved
history.get("/course", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["token-key"]
    if (!contentType || contentType != "application/json") {
        const errorHeaderToken: responseError = {
            code: "400",
            status: "Failed",
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
            const serverError: responseError = {
                code: "500",
                status: "Failed",
                message: "An error occurred while processing your request. Please try again later"
            };
            res.status(500).json(serverError);
        }
    }
})

//
history.get("/results", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["token-key"]
    const { status }: any = req.body
    if (!contentType || contentType != "application/json") {
        const errorHeaderToken: responseError = {
            code: "400",
            status: "Failed",
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
            const serverError: responseError = {
                code: "500",
                status: "Failed",
                message: "An error occurred while processing your request. Please try again later"
            };
            res.status(500).json(serverError);
        }
    }
})


history.get("/reimbursement", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    // const tokenkey: any = reqHeader["token-key"]
    if (!contentType || contentType != "application/json") {
        const errorHeaderToken: responseError = {
            code: "400",
            status: "Failed",
            message: `Missing required headers: content-type and authorization token End-Point historyCou?`
        }
        res.status(400).send(errorHeaderToken)
    } else {
        try {
            const dbHistorys = await reimbursements
                .find({})
            const successData: responseData = {
                code: '200',
                status: 'OK',
                data: dbHistorys
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