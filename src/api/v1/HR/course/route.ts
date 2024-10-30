import express, { Request, Response } from 'express'
import { register } from 'module';

export const Register = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

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


Register.post("/register", (req: Request, res: Response) => {
    const body = req.body;
      res.status(200).json ({
      code: "Success-01-0001",
      status: "Sucess",
      data: {
        empId: body.empId,
        courseId: body.courseId,
        trainingDate: "19/07/2024",
        courseName: "คอมพิวเตอร์",
        TrainingLocation: "มหาวิทายาลัยศรีปทุม",
        periods : "09:00-11:30"
      },
    });
  });