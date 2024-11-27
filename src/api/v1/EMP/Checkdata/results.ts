import express, { Request, Response } from 'express';
import { responseData, responseError } from '../../interfaceRes/response'
import { employees } from '../../Schema/emp';

export const checkdata = express();




checkdata.post('/checkdata', async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    // const empID = req.query.Empid as string;
    const { empID } = req.body


    // ตรวจสอบการมี empID ในคำขอและเช็ค contentType
    if (!tokenkey || !contentType) {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            message: "Cannot Show "
        });
    }
    else if (!empID){
        res.status(404).json({
            code: "404",
            status: "error",
            message: "EmpID not found",
          });
    }  
    // สร้างข้อมูล response
    const CheckdataresponseData = await employees.findOne({
        empID: empID
    });
  
    res.status(200).json({
        code: "200",
        status: "success",
        data: { CheckdataresponseData }

    })
});

