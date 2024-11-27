import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { employees } from "../../Schema/emp";
import { courseResult } from "../../HR/courseResults/route";
import { courseResults } from "../../Schema/courseResults";
import { enrollments } from "../../Schema/enrollment";
import { course } from "../../Schema/course";

export const checkdata = express();

/**
 * @swagger
 *  /checkdata/dashboard:
 *   post:
 *     summary: Emp Dashboard
 *     tags:
 *       - Employees DashBoard
 *     requestBody:
 *       description: User Info
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: ob ject
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: No username or password
 */
checkdata.post("/dashboard", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  // const empID = req.query.Empid as string;
  const { empID } = req.body;

  // ตรวจสอบการมี empID ในคำขอและเช็ค contentType
  if (!tokenkey || !contentType) {
    res.status(400).json({
      code: "400",
      status: "Bad Request",
      message: "Cannot Show ",
    });
  } else if (!empID) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpID not found",
    });
  } else {
    // สร้างข้อมูล response
    const empData = await employees.findOne({
      empID: empID,
    });
    const courseResult = await courseResults
      .find({ empID: empID })
      .sort({ _id: -1 });

    res.status(200).json({
      code: "200",
      status: "success",
      data: { empData, courseResult },
    });
  }
});

checkdata.post("/enrollments", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  // const empID = req.query.Empid as string;
  const { empID } = req.body;

  // ตรวจสอบการมี empID ในคำขอและเช็ค contentType
  if (!tokenkey || !contentType) {
    res.status(400).json({
      code: "400",
      status: "Bad Request",
      message: "Cannot Show ",
    });
  } else if (!empID) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpID not found",
    });
  } else {
    // สร้างข้อมูล response
    const enrollment = await enrollments.find({
      empId: empID,
      status: "registered",
    });
    const courseId = enrollment.map((item) => item.courseId);
    const sid = enrollment.map((item) => item.sessionId);
    const courseData = await course.find({ 
        courseId: courseId,
        "sessions.sessionId": sid
    }, {
        "courseName": 1,
        "sessions.$": 1 
    });
    res.status(200).json({
      code: "200",
      status: "success",
      data: courseData,
    });
  }
});
