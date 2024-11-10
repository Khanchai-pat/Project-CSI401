import express, { Request, Response } from "express";
import { responseData, responseError } from "../model/model";
import mongoose from "mongoose";
export const checkData = express();

//Check Data EMP
checkData.get("/checkEmp", async (req: Request, res: Response) => {
  try {
    const reqHeader: any = req.headers;
    //                                 key in postman
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];

    if (tokenkey && contentType) {
      console.log("this is if");
      //connect connection string
      mongoose.connect(
        "mongodb://Admin:1234@localhost:27017/mydb?authSource=mydb"
      );

      //creat model
      const userSchemas = new mongoose.Schema({
        // coed: { type: String, required: true }
        code: String,
        firstName: String,
        lastName: String,
      });

      // define model
      const Users = mongoose.model("users", userSchemas);

      //Process
      const dbResponse = await Users.find({});

      mongoose.connection.close();

      const reqCheckData: responseData = {
        code: "200",
        status: "success checkEmp",
        data: dbResponse,
      };
      res.status(200).json(reqCheckData);
    } else {
      console.log("this is else");
      res.status(500).send({
        message:
          "Missing required headers: content-type and authorization token End-Point checkEmp"
      });
    }
  } catch {
    //Test
  }
});

//Check Data byEmp ID
checkData.get("/checkEmp/:id", async (req: Request, res: Response) => {
  try {
    const reqHeader: any = req.headers;
    //                                 key in postman
    const contentType: any = reqHeader["content-type"];
    //                                 key in postman
    const tokenkey: any = reqHeader["authorization"];

    if (tokenkey && contentType) {
      console.log("this is if");
      const reqCheckEmpID: responseData = {
        code: "200",
        status: "success checkEmp ID",
        data: {
          EmpID: "Emp001",
          EmpName: "John Doe",
          department: "Sales",
          cardID: "1-0000-00000-00-0",
          email: "johndoe@example.com",
          tel: 123445112,
          firstTrainingDate: "2023-09-30",
          courseDetails: [
            {
              courseID: "ABC100",
              trainingDate: "2024-03-20",
              courseName: "เตรียมความพร้อมสู่การทำงาน",
              trainingLocation: "5-505",
              trainingHours: 8,
            },
          ],
          expiryDate: "2025-09-30",
          trainingDuration: "00-00-01",
          nextExpiryDate: "00-11-30",
          EmpStatus: "Active",
        },
      };
      res.status(200).json(reqCheckEmpID);
    } else {
      console.log("this is else");
      res.status(400).send({
        message:
          "Missing required headers: content-type and authorization token End-Point checkEmpID",
      });
    }
  } catch (error) {
    console.log(error);
    // test
  }
});
