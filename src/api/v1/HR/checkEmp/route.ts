import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
export const checkData = express();
import { employees } from "../../Schema/emp";
import { verifyToken } from "../../middleware/route";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultSecretKey";

// Check Data EMP
checkData.get("/checkEmp", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  // const tokenkey: any = reqHeader["token-key"];
  // if (!tokenkey || !contentType){}
  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp.",
    };
    res.status(400).json(missingHeaders);
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
      console.log(error);
      const serverError: responseError = {
        code: "500",
        status: "Failed",
        message:
          "An error occurred while processing your request. Please try again later",
      };
      res.status(500).json(serverError);
    }
  }
});

// Check Data by Employee Id
checkData.get(
  "/checkEmpId/:empId?",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const token: any = reqHeader["authorization"];
    
    const decode:any = jwt.verify(token, SECRET_KEY);
    console.log(decode);


    

    const { empId } = req.params;

    if (!contentType || contentType != "application/json") {
      const missingHeaders: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmpId.",
      };
      res.status(400).json(missingHeaders);
    } else {
      if (decode.roles !== "Hr") {
        const missingHeaders: responseError = {
          code: "401",
          status: "Unauthorized",
          message:
            "Don't have permission",
        };
        res.status(400).json(missingHeaders);
      } else {
        if (!empId) {
          // กรณีไม่มีการส่ง empId มาใน request
          const missingParamError: responseError = {
            code: "400",
            status: "Failed",
            message:
              "Bad Request: Missing 'empId' parameter for endpoint /checkempId.",
          };
          res.status(400).json(missingParamError);
        } else {
          try {
            // Process การ query ข้อมูลพนักงานจากฐานข้อมูลโดยใช้ empId
            const dbResponse = await employees.find({ empId: empId });
            if (dbResponse.length === 0) {
              // กรณีไม่มีข้อมูลที่ตรงกับ empId
              const noDataError: responseError = {
                code: "404",
                status: "Not Found",
                message: `Employee with Id '${empId}' not found.`,
              };
              res.status(404).json(noDataError);
            }

            const checkempId: responseData = {
              code: "200",
              status: "Success",
              data: dbResponse,
            };
            res.status(200).json(checkempId);
          } catch (error) {
            console.log(error);
            const serverError: responseError = {
              code: "500",
              status: "Failed",
              message:
                "An error occurred while processing your request. Please try again later",
            };
            res.status(500).json(serverError);
          }
        }
      }
    }
  }
);
