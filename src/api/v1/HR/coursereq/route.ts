import express, { Request, Response } from 'express'
import { responseData, responseError } from '../model/model';
import mongoose from 'mongoose';
export const course = express();

const userSchemas = new mongoose.Schema({
    // coed: { type: String, required: true }
    code: String,
    firstName: String,
    lastName: String,
});

const Request = mongoose.model("sections", userSchemas);

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
        const dbRequests = await Request.find({})
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
course.get("/requestsID/:id?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { id }: any = req.params

    if (!tokenkey || !contentType) {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /requests/:id"
        }
        res.status(500).send(errData)
    }

    if (!id) {
        const errData: responseError = {
            message: "Missing Params"
        }
        res.status(500).send(errData)
    }

    try {
        const dbRequestsID = await Request.find({ _id: id })
        const reqCourse: responseData = {
            code: "200",
            status: "OK /requests/:id",
            data: dbRequestsID
        }
        res.status(200).json(reqCourse)

    } catch (error) {
        const errorDb: responseError = {
            message: 'Can not sent Data by id'
        }
        res.status(400).json(errorDb)
    }

    res.status(200).json()
})

//Show list request ByID appove
course.post("/appove:id?", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const { id, sectionCode }: any = req.body

    if (!contentType || !tokenkey) {
        const errorHeaderToken: responseError = {
            message: `Missing required headers: content-type and authorization token End-Point appove:id?`
        }
        res.status(400).send(errorHeaderToken)
    }

    if (!id) {
        const errorBodyid: responseError = {
            message: `Missing required body id`
        }
        res.status(400).send(errorBodyid)
    }

    try {
        const cerrenData = await Request.find({ _id: id })
        const updateData = { ...cerrenData, ...sectionCode }
        const dbappove = await Request.updateOne({ _id: id },
            { $set: updateData }
        )
        res.status(200).json(dbappove)
    } catch {
        const errorDb: responseError = {
            message: `Can not Appove Data by id`
        }
        res.status(400).send(errorDb)
    }
})

// Show list request ByID reject
course.post("/rejectID:id", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')

        const reqCourse: responseData = {
            code: "200",
            status: "OK reject",
            data: [
                {
                    status: "Reject",
                    remark: "ลงทะเบียนเยอะเกินไป",
                    approvalDate: "2024-10-18"
                },
            ]
        }
        res.status(200).json(reqCourse)
    } else {
        console.log('this is else')
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /reject course"
        }
        res.status(500).send(errData)
    }
})



//1.2.14 API : HR - Show Courses Results
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.15 API : HR - Show Courses Results ByID
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.16 API : HR - Show Courses Results ByID Update
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

