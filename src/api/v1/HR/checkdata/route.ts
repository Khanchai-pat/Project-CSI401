import express, { Request, Response } from 'express'

export const auth = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

//Check Data EMP
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//Check Data byEmp
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})