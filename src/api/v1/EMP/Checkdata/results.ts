import express, { Request, Response } from 'express';
import { responseData, responseError } from '../Model/model';
import mongoose from 'mongoose';

export const checkdata = express();
const userSchemas = new mongoose.Schema({
    // coed: { type: String, required: true }
    empID: String,
    empName: String,
    courses: Array,
    courseID : String,
    courseName : String,
    completionDate : Number,
    status : String,
  });

// ข้อมูลตัวอย่างพนักงาน
const results = {
    Empdata: {
        empID: "Emp001",
        empName: "John Doe",
        courses: [
            {
                courseID: "ABC100",
                courseName: "เตรียมความพร้อมสู่การทำงาน",
                completionDate: "2024-10-01",
                status: "Passed"
            },
            {
                courseID: "ABC101",
                courseName: "ความปลอดภัยในการทำงาน",
                completionDate: "2024-09-15",
                status: "Passed"
            }
        ]
    }
};


checkdata.post('/checkdata', async(req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const empID = req.query.Empid as string;

    // ตรวจสอบการมี empID ในคำขอและเช็ค contentType
    if (!empID || !contentType || contentType != "json") {
            res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show"
        });
    }
    // ดึงข้อมูลพนักงานจาก results
    const employeeData = results.Empdata;

    // หาก empID ไม่ตรงกับข้อมูลพนักงาน
    if (employeeData.empID !== empID) {
            res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show"
        });
    }
    const Check = mongoose.model("EMP",userSchemas);
    // สร้างข้อมูล response
    const CheckdataresponseData = await Check.find({});
        // code: "200",
        // status: "success",
        // message: "Successfully retrieved training results",

        // EmpID: employeeData.empID,
        // EmpName: employeeData.empName,
        // courses: employeeData.courses.map(course => ({
        //     courseID: course.courseID,
        //     courseName: course.courseName,
        //     completionDate: course.completionDate,
        //     status: course.status
        // }))
    // };
        res.status(200).json({
        code: "200",
        status : "success",
        data : {
            CheckdataresponseData,
        }
    })
});

