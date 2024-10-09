import express, { Request, Response } from "express"

export const auth = express();


// const headerVerify: any = req.headers; //s
// const xAppkey: string | undefined = headerVerify['x-application-key']


interface responseData {
    code: string,
    ststus: string,
    data: object
}

auth.get("/login", (req: Request, res: Response) => {

    const errorRes: responseData = {
        code: "Error-01-xAppkey",
        ststus: "error",
        data: {}
    }
    res.send(errorRes);

});