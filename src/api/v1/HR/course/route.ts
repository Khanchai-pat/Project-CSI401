import express, { Request, Response } from 'express'
import { responseData, responseError } from '../Model/model';
export const auth = express();

// interface responseData {
//     code: string,
//     status: string,
//     data: object
// }

// interface responseError {
//     mesage: string
// }

//Show list requests 
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

////Show list requests By ID
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//Show list request ByID appove
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//Show list request ByID reject
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.14 API : HR - Show Courses Results 

auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.15 API : HR - Show Courses Results ByID
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})


//1.2.16 API : HR - Show Courses Results ByID Update
auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})




