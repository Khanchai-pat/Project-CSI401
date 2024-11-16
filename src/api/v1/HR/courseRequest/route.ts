import express, { Request, Response } from 'express'
import { responseData, responseError } from '../model/model';
import mongoose from 'mongoose';
export const course = express();
const userSchemas = new mongoose.Schema({
    // coed: { type: String, required: true }
    subjectCode: String,
    subjectName: String,
    subjectDetail: String,
    subjectCredit: String,
    subjectHours: String,
    section: Array
});

const Requests = mongoose.model("subjects", userSchemas);

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
        const dbRequests = await Requests.find({})
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
course.get("/requestsId/:id?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { id }: any = req.params
    console.log(id)

    if (!tokenkey || !contentType) {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /requests/:id"
        }
        res.status(500).send(errData)
    } else {
        if (!id) {
            const errData: responseError = {
                message: "Missing Params"
            }
            res.status(500).send(errData)
        } else {
            try {
                const dbRequestsID = await Requests.find({ _id: id })
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
                const cerrenData = await Requests.findById({ _id: reqId })

                // const newdata = { ...cerrenData, ...body }
                // console.log(newdata)

                const dbappove = await Requests.updateOne({ _id: reqId },
                    {
                        $set: {
                            subjectHours: status
                        }
                    }
                );
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
                const cerrenData = await Requests.findById({ _id: reqId })

                // const newdata = { ...cerrenData, ...body }
                // console.log(newdata)

                const dbappove = await Requests.updateOne({ _id: reqId },
                    {
                        $set: {
                            subjectHours: status
                        }
                    }
                );
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


