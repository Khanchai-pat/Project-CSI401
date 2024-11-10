import express, { Request, Response } from 'express'
import { responseData, responseError } from '../Model/model';
export const reimbursements = express();

// interface responseData {
//     code: string,
//     status: string,
//     data: object
// }

// interface responseError {
//     mesage: string
// }


//1.2.11 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show  List 
reimbursements.get("/requests", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //key in postman
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    if (tokenkey && contentType) {
        const reqReimbursement: responseData = {
            code: "200",
            status: "success",
            data: {
                "reimID" : "Reim001",
                "EmpID": "Emp001",
                "EmpName": "John Doe",
                "department": "Sales",
                "email": "johndoe@example.com",
                "tel": 123445112,
                "courseID" : "A001",
                "courseName" : "CSI"
            }
    }
    res.status(200).send(reqReimbursement)
} else {
    res.status(500).send({
        message: "Missing required headers: content-type and authorization token and limit-offset Endpoint Coursereimbursement"
    })
}
})



////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byID
reimbursements.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
reimbursements.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
reimbursements.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})