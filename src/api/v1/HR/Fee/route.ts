import express, { Request, Response } from "express";
import { responseData, responseError } from "../model/model";
export const Fee = express();

//1.2.11 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show  List
Fee.get("/signout", (req: Request, res: Response) => {});

////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byID
Fee.get("/signout:id", (req: Request, res: Response) => {});

//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
Fee.post("/appove", (req: Request, res: Response) => {});

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
Fee.post("/reject", (req: Request, res: Response) => {});
