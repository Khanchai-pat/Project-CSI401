import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement";

export const empReimbursement = express.Router();




empReimbursement.post("/requests", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const { empId, courseID ,moneyAmount,bankAccount,empName,department,cardID} = req.body;
    if (!tokenkey || !contentType) {
      res.status(401).json({
        code: "401",
        status: "error",
        message: "Unauthorized",
      });
    } else if (!empId || !courseID || !bankAccount) {
      res.status(404).json({
        code: "404",
        status: "error",
        message: "EmpID/courseID not found",
      });
    } else {
      const findReq = await reimbursements.countDocuments({});
      const createReqid = "R" + String(findReq + 1).padStart(3, "0");
      const dbResults = await reimbursements.create({
        reqId: createReqid,
        courseID: courseID,
        empId: empId,
        empName : empName,
        department : department,
        cardID : cardID,
        bankAccount : bankAccount,
        MoneyAmout: moneyAmount,
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
  

// requests.post("/request", async (req: Request, res: Response) => {
//     const { EmpID, courseID, DateReim, MoneyAmount }: ReimbursementRequest = req.body;

//     try {
//         const currentYear = new Date(DateReim).getFullYear();
//         const existingRequest = await Reimbursement.findOne({
//             employeeId: EmpID,
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
//             employeeId: EmpID,
//             courseId: courseID,
//             requestDate: DateReim,
//             courseCost: MoneyAmount
//         });

//         await newRequest.save();

//         res.status(200).json({
//             code: 200,
//             status: "success",
//             message: "Successful",
//             data: {
//                 EmpID,
//                 courseID,
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


