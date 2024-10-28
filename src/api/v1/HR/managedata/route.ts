import express, { Request, Response } from 'express'

export const auth = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

//create-Emp
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//edit-Emp
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//delete-Emp
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})