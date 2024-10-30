import express, { Request, Response } from 'express'

export const auth = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

//1.2.11 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show  List 
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byID

auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//Acoa   > ayum

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})