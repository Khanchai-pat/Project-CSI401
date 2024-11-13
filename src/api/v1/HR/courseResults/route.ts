import express, { Request, Response } from "express";
import { responseData, responseError } from '../../model/model';
import mongoose from "mongoose";
export const courseUpdate = express();

//creat model
const userSchemas = new mongoose.Schema({
  // coed: { type: String, required: true }
  code: String,
  firstName: String,
  lastName: String,
});

// define model
const Results = mongoose.model("sucjects", userSchemas);

//1.2.14 API : HR - Show Courses Results
courseUpdate.get("/results", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];

  if (!tokenkey || !contentType) {
    const errData: responseError = {
      message:
        "Missing required headers: content-type and authorization token End-Point /requests HR - Show Courses Results",
    };
    res.status(400).json(errData);
  }

  try {
    const dbResults = await Results.find({})
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults
    }
    res.status(200).json(resultsData)
  } catch (error) {
    console.log(error)
    const resultsError: responseError = {
      message: "Missing required Show results"
    }
    res.status(400).send(resultsError)
  }
});

//1.2.15 API : HR - Show Courses Results ByID
courseUpdate.get("/resultsID/:id", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];
  const { id }: any = req.params

  // ตรวจสอบ headers ที่ต้องการ
  if (!tokenkey || !contentType) {
    const verify: responseError = {
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses Results ByID ",
    };
    res.status(400).json(verify);
  }
  if(!id){
    
  }

});

//1.2.16 API : HR - Show Courses Results ByID Update
courseUpdate.post("/update", async (req: Request, res: Response) => {
  try {
    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: string = reqHeader["authorization"];

    // ตรวจสอบ headers ที่ต้องการ
    if (!tokenkey || !contentType) {
      const errData: responseError = {
        message:
          "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses update",
      };
      res.status(400).json(errData);
    }
    // เมื่อ headers ถูกต้อง จะสร้างข้อมูลตัวอย่าง response
    const reqCourse: responseData = {
      code: "200",
      status: "OK",
      data: {},
    };

    // ส่ง response กลับไปที่ client
    res.status(200).json(reqCourse);
  } catch (error) {
    console.error("Error handling /requests endpoint:", error);
    const errData: responseError = {
      message: "Internal server error at /requests endpoint.",
    };
    res.status(400).json(errData);
  }
});
