import express, { Request, Response } from 'express';
import { responseData, responseError } from '../../model/model';

export const checkdata = express();

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


checkdata.get('/checkdata', (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const empID = req.query.Empid as string;

    // ตรวจสอบการมี empID ในคำขอ
    if (!empID) {
        return res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show"
        });
    }

    // ดึงข้อมูลพนักงานจาก results
    const employeeData = results.Empdata;

    // หาก empID ไม่ตรงกับข้อมูลพนักงาน
    if (employeeData.empID !== empID) {
        return res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show"
        });
    }

    // สร้างข้อมูล response
    const responseData = {
        code: "200",
        status: "success",
        message: "Successfully retrieved training results",
        EmpID: employeeData.empID,
        EmpName: employeeData.empName,
        courses: employeeData.courses.map(course => ({
            courseID: course.courseID,
            courseName: course.courseName,
            completionDate: course.completionDate,
            status: course.status
        }))
    };

    
    res.json(responseData);
});

