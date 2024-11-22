import express, { Request, Response } from "express";
import { responseData, responseError } from '../../interfaceRes/response';
export const checkData = express();
import { employees } from "../Schema/emp"

// Check Data EMP
checkData.get("/checkEmp", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["token-key"];
  // if (!tokenkey || !contentType){}
  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp.",
    };
    res.status(400).json(missingHeaders);
    // try {
    //   // Process
    //   const dbResponse = await employees.find({});
    //   const reqCheckData: responseData = {
    //     code: "200",
    //     status: "Employee data retrieved successfully",
    //     data: dbResponse,
    //   };
    //   res.status(200).json(reqCheckData);
    // } catch (error) {
    //   console.log(error);
    //   const errData: responseError = {
    //     code: "500",
    //     status: "Failed",
    //     message: `Internal Server Error: Unable to retrieve employee data. Reason`,
    //   };
    //   res.status(500).json(errData);
    // }
  } else {
    try {
      // Process
      const dbResponse = await employees.find({});
      const reqCheckData: responseData = {
        code: "200",
        status: "Employee data retrieved successfully",
        data: dbResponse,
      };
      res.status(200).json(reqCheckData);
    } catch (error) {
      console.log(error)
      const serverError: responseError = {
        code: "500",
        status: "Failed",
        message: "An error occurred while processing your request. Please try again later"
      };
      res.status(500).json(serverError);
    }
  }
});

// Check Data by Employee ID
checkData.get("/checkEmpId/:empId?", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["token-key"];
  const { empId } = req.params;

  if (!tokenkey || !contentType) {
    // ข้อผิดพลาดในการยืนยัน header ที่จำเป็น
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message: "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmpId.",
    };
    res.status(400).json(missingHeaders);
  } else {

    if (!empId) {
      // กรณีไม่มีการส่ง empId มาใน request
      const missingParamError: responseError = {
        code: "400",
        status: "Failed",
        message: "Bad Request: Missing 'empId' parameter for endpoint /checkEmpId.",
      };
      res.status(400).json(missingParamError);
    } else {
      try {
        // Process การ query ข้อมูลพนักงานจากฐานข้อมูลโดยใช้ empId
        const dbResponse = await employees.find({ empID: empId });
        if (dbResponse.length === 0) {
          // กรณีไม่มีข้อมูลที่ตรงกับ empId
          const noDataError: responseError = {
            code: "404",
            status: "Not Found",
            message: `Employee with ID '${empId}' not found.`,
          };
          res.status(404).json(noDataError);
        }

        // ถ้ามีข้อมูล ตอบกลับสถานะสำเร็จ
        const checkEmpID: responseData = {
          code: "200",
          status: "Success",
          data: dbResponse,
        };
        res.status(200).json(checkEmpID);
      } catch (error) {
        console.log(error)
        const serverError: responseError = {
          code: "500",
          status: "Failed",
          message: "An error occurred while processing your request. Please try again later"
        };
        res.status(500).json(serverError);
      }
    }
  }
}

);
