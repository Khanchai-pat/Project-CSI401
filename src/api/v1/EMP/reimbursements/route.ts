import express, { Request, Response } from "express";
import Reimbursement, { IReimbursement } from "../Schema/Reimbursementschema";
import { ReimbursementRequest, } from "./reimbursement";

export const requests = express.Router();


requests.post("/request", async (req: Request, res: Response) => {
    const { EmpID, courseID, DateReim, MoneyAmount }: ReimbursementRequest = req.body;

    try {
        const currentYear = new Date(DateReim).getFullYear();
        const existingRequest = await Reimbursement.findOne({
            employeeId: EmpID,
            requestDate: { $gte: new Date(`${currentYear}`), $lte: new Date(`${currentYear}`) }
        });

        if (existingRequest) {
                res.status(400).json({
                code: 400,
                status: "error",
                message: "Request already submitted for this year"
            });
        }

        const newRequest: IReimbursement = new Reimbursement({
            employeeId: EmpID,
            courseId: courseID,
            requestDate: DateReim,
            courseCost: MoneyAmount
        });

        await newRequest.save();

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Successful",
            data: {
                EmpID,
                courseID,
                DateReim,
                MoneyAmount,
                statusPending: "Pending"
            }
        });
    } catch (err) {
        res.status(400).json({
            code: 400,
            status: "Bad Request",
            message: "Cannot",
        });
    }
});


