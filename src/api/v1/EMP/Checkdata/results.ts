import express, { Request, Response } from 'express';
import { responseData, responseError } from '../../interfaceRes/response'
import mongoose from 'mongoose';

export const checkdata = express();
const userSchemas = new mongoose.Schema({
    // coed: { type: String, required: true }
    empID: String,
    empName: String,
    courses: Array,
    courseID: String,
    courseName: String,
    completionDate: Number,
    status: String,
});




checkdata.post('/checkdata', async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    // const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    // const empID = req.query.Empid as string;
    const { body } = req.body


    // ตรวจสอบการมี empID ในคำขอและเช็ค contentType
    if (!tokenkey || tokenkey != "'ssp'") {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show "
        });
    }
 
    const Check = mongoose.model("emps", userSchemas);
    
    // สร้างข้อมูล response
    const CheckdataresponseData = await Check.findOne({
        empId: body.empId
    });
  
    res.status(200).json({
        code: "200",
        status: "success",
        data: { CheckdataresponseData }

    })
});

