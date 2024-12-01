import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
import { employees } from "../../Schema/emp";

export const empReimbursement = express.Router();

empReimbursement.post("/requests", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId, courseId, amount, bankAccount, cardId } = req.body;
  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
    };
    res.status(400).json(missingHeaders);
  } else if (decoded.roles != "Emp") {
    const promis: responseError = {
      code: "400",
      status: "Failed",
      message: "Don't have promision",
    };
    res.status(400).json(promis);
  } else if (!empId || !courseId || !bankAccount || !amount) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpId/courseId not found",
    });
  } else {
    const empData = await employees.find({empId:empId})
    const empName =  empData.map((item)=>item.empName)
    const department = empData.map((item)=>item.department)
    const findReq = await reimbursements.countDocuments({});
    const createReqid = "R" + String(findReq + 1).padStart(3, "0");
    const dbResults = await reimbursements.create({
      reqId: createReqid,
      courseId: courseId,
      empId: empId,
      empName: empName.toString(),
      department: department.toString(),
      cardId: cardId,
      bankAccount: bankAccount,
      amount: amount,
      status: "pending",
    });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});

empReimbursement.post("/details", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId } = req.body;
  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
    };
    res.status(400).json(missingHeaders);
  } else if (decoded.roles != "Emp") {
    const promis: responseError = {
      code: "400",
      status: "Failed",
      message: "Don't have promision",
    };
    res.status(400).json(promis);
  } else if (!empId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "empId / courseId not found",
    });
  } else {
    const dbResults = await reimbursements.find({empId:empId
    });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});
// requests.post("/request", async (req: Request, res: Response) => {
//     const { EmpId, courseId, DateReim, MoneyAmount }: ReimbursementRequest = req.body;

//     try {
//         const currentYear = new Date(DateReim).getFullYear();
//         const existingRequest = await Reimbursement.findOne({
//             employeeId: EmpId,
//             requestDate: { $gte: new Date(`${currentYear}`), $lte: new Date(`${currentYear}`) }
//         });

//         if (existingRequest) {
//                 res.status(400).json({
//                 code: 400,
//                 status: "error",
//                 message: "Request already submitted for this year"
//             });
//         }

//         const newRequest = new Reimbursement({
//             employeeId: EmpId,
//             courseId: courseId,
//             requestDate: DateReim,
//             courseCost: MoneyAmount
//         });

//         await newRequest.save();

//         res.status(200).json({
//             code: 200,
//             status: "success",
//             message: "Successful",
//             data: {
//                 EmpId,
//                 courseId,
//                 DateReim,
//                 MoneyAmount,
//                 statusPending: "Pending"
//             }
//         });
//     } catch (err) {
//         res.status(400).json({
//             code: 400,
//             status: "Bad Request",
//             message: "Cannot",
//         });
//     }
// });


