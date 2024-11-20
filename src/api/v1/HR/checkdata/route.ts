import express, { Request, Response } from "express";
import { responseData, responseError } from '../../interfaceRes/response';
export const checkData = express();
import { employees } from "../Schema/emp"

//Check Data EMP
checkData.get("/checkEmp", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  if (tokenkey && contentType) {
    try {
      //Process
      const dbResponse = await employees.find({});
      const reqCheckData: responseData = {
        code: "200",
        status: "success checkEmp",
        data: dbResponse,
      };
      res.status(200).json(reqCheckData);
    } catch (error) {
      console.error("Database query error in /checkEmpID:", error);
      const errData: responseError = {
        message: `Internal server error while querying employee data.
            ${error}`
      };
      res.status(500).json(errData)
    }
  } else {
    res.status(500).send({
      message:
        "Missing required headers: content-type and authorization token End-Point checkEmp"
    });
  }
});

//Check Data byEmp ID
checkData.get("/checkEmpId/:empId?", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { empId } = req.params

  if (tokenkey && contentType) {
    if (!empId) {
      res.status(400).json({
        message: `Missing id parameter`,
      });
    }
    try {
      const dbResponse = await employees.find({ empId: empId });
      const checkEmpID: responseData = {
        code: "200",
        status: "success checkEmp",
        data: dbResponse,
      };
      res.status(200).json(checkEmpID);
    } catch (error) {
      console.error("Database query error in /checkEmpID:", error);
      const errData: responseError = {
        message: `Internal server error ไม่พบไอดีนี้`,
      };
      res.status(500).json(errData);
    }
  } else {
    res.status(400).send({
      message:
        "Missing required headers: content-type and authorization token End-Point checkEmpID",
    });
  }
});
