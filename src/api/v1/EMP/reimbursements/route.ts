import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const empReimbursement = express.Router();




/**
 * @swagger
 * /reimbursements/requests:
 *   post:
 *     summary: Emp Reimbursement Request
 *     tags:
 *       - Emp Reimbursement
 *     parameters:
 *       - in: header
 *         name: content-type
 *         required: true
 *         schema:
 *           type: string
 *         description: Specify the content type, e.g., application/json
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     requestBody:
 *       description: Request body containing the employee ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empId:
 *                 type: string
 *                 description: Employee ID to retrieve data for
 *                 example: EMP001
 *               courseId:
 *                 type: string
 *                 description: Course ID to retrieve data for
 *                 example: C001
 *               bankAccount:
 *                 type: string
 *                 description: BankAccount to retrieve data for
 *                 example: 123123123
 *     responses:
 *       200:
 *         description: Successfully Registeration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reqId:
 *                       type: string
 *                       description: Request ID
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     empName:
 *                       type: string
 *                       description: Employee Name
 *                     department:
 *                       type: string
 *                       description: Department
 *                     cardId:
 *                       type: string
 *                       description: Card ID
 *                     bankAccount:
 *                       type: string
 *                       description: Bank Account
 *                     moneyAmount:
 *                       type: string
 *                       description: Money Amount
 *                     status:
 *                       type: string
 *                       description: Status
 *       400:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Cannot Show"
 *       404:
 *         description: EmpID/CourseID/bankAccount not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "404"
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "EmpID/CourseID/bankAccount not found"
 */
empReimbursement.post("/requests", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId, courseId, moneyAmount, bankAccount, empName, department, cardId } = req.body;
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
      moneyAmount: moneyAmount,
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


