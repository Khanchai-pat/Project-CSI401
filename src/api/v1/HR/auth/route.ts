import express, { Request, Response } from 'express'

export const auth = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

auth.post("/signin", (req: Request, res: Response) => {

    const reqHeader: any = req.headers
    const xAppkey: string = reqHeader.x_application_key
    //                      reqHeader["x-application-key"]
    const { reqBody, username, password }: any = req.body

    if (xAppkey && xAppkey === "ssp") {
        if (username && password) {
            const succsessSignin: responseData = {
                code: "Succsess",
                status: "ok",
                data: {
                    username: reqBody.username
                }
            }
            res.status(200).send(succsessSignin)
        } else {
            const errorSignin: responseData = {
                code: "Error",
                status: "Error",
                data: {
                    message: `username = ${reqBody.username} password = ${reqBody.password}`
                }
            }
            res.status(400).send(errorSignin)
        }
    } else {
        const errorXAppkey: responseData = {
            code: "Error",
            status: "Error",
            data: {
                message: "Eror Don't Have XAppkey"
            }
        }
        res.status(400).send(errorXAppkey)
    }

})


auth.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})