import express, { Request, Response } from 'express'
import { responseData, responseError } from '../../model/model';
import mongoose from 'mongoose';
export const course = express();
import { courseRequests } from "../Schema/courseRequest"

course.get("/requests", async (req: Request, res: Response) => {

    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: string = reqHeader["authorization"];

    if (!tokenkey || !contentType) {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /requests"
        };
        res.status(400).json(errData);
    }
    try {
        const dbRequests = await courseRequests.find({})
        const reqCourse: responseData = {
            code: "200",
            status: "OK",
            data: dbRequests
        };
        res.status(200).json(reqCourse);
    } catch (error) {
        const errorDb: responseError = {
            message: "Internal server error at /requests endpoint."
        };
        res.status(500).json(errorDb);
    }
});

////Show list requests By ID
course.get("/requestsId/:reqId?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { reqId }: any = req.params
    console.log(reqId)

    if (!tokenkey || !contentType) {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /requests/:id"
        }
        res.status(500).send(errData)
    } else {
        if (!reqId) {
            const errData: responseError = {
                message: "Missing Params"
            }
            res.status(500).send(errData)
        } else {
            try {
                const dbRequestsID = await courseRequests.find({ reqId: reqId })
                const reqCourse: responseData = {
                    code: "200",
                    status: "OK /requests/:id",
                    data: dbRequestsID
                }
                res.status(200).json(reqCourse)

            } catch (error) {
                const errorDb: responseError = {
                    message: `Can not sent Data by id${error}`
                }
                res.status(400).send(errorDb)
            }
        }
    }
})

//Show list request ByID appove
course.post("/appove", async (req: Request, res: Response) => {
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
                // const cerrenData = await courseRequests.findById({ _id: reqId })

                // const newdata = { ...cerrenData, ...body }
                // console.log(newdata)

                const dbappove = await courseRequests.updateOne({ reqId: reqId }, req.body);
                res.status(200).json(dbappove)
            } catch (errer) {
                console.log(errer)
                const errorDb: responseError = {
                    message: `Can not Appove Data by id`
                }
                res.status(400).send(errorDb)
            }
        }
    }
})

// Show list request ByID reject
course.post("/reject", async (req: Request, res: Response) => {
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
                // const cerrenData = await courseRequests.findById({ reqId: reqId })

                // const newdata = { ...cerrenData, ...body }
                // console.log(newdata)

                const dbappove = await courseRequests.updateOne({ reqId: reqId }, req.body);
                res.status(200).json(dbappove)
            } catch (errer) {
                console.log(errer)
                const errorDb: responseError = {
                    message: `Can not reject Data by id`
                }
                res.status(400).send(errorDb)
            }
        }
    }
})


