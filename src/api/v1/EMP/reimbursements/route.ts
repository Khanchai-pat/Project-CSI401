import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement";

export const empReimbursement = express.Router();




empReimbursement.post("/requests", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { empId, courseId, moneyAmount, bankAccount, empName, department, cardId } = req.body;
  if (!tokenkey || !contentType) {
    res.status(401).json({
      code: "401",
      status: "error",
      message: "Unauthorized",
    });
  } else if (!empId || !courseId || !bankAccount) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpId/courseId not found",
    });
  } else {
    const findReq = await reimbursements.countDocuments({});
    const createReqid = "R" + String(findReq + 1).padStart(3, "0");
    const dbResults = await reimbursements.create({
      reqId: createReqid,
      courseId: courseId,
      empId: empId,
      empName: empName,
      department: department,
      cardId: cardId,
      bankAccount: bankAccount,
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


