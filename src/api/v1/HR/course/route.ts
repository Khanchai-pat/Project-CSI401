import express, { Request, Response } from 'express'
import { responseData, responseError } from '../Model/model';
export const Register = express();

// interface responseData {
//     code: string,
//     status: string,
//     data: object
// }

// interface responseError {
//     mesage: string
// }


//Show list requests 
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

////Show list requests By ID
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//Show list request ByID appove
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//Show list request ByID reject
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.14 API : HR - Show Courses Results
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.15 API : HR - Show Courses Results ByID
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.16 API : HR - Show Courses Results ByID Update
Register.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

