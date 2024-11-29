import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { enrollments } from "../../Schema/enrollment";
import { courseResults } from "../../Schema/courseResults";
import { course } from "../../Schema/course";
import { enrollment } from "../../HR/enrollment/route";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
export const Courses = express();

// const verifyToken = (token: string | undefined): boolean => {
//   const validToken = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
//   return token === validToken;
// };

/**
 * @swagger
 * /courses/register:
 *   post:
 *     summary: Emp Registerations
 *     tags:
 *       - Course
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
 *               sessionsId:
 *                 type: string
 *                 description: Sessions ID to retrieve data for
 *                 example: S001
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
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     sessionsId:
 *                       type: string
 *                       description: Session ID
 *                     trainingDate:
 *                       type: string
 *                       format : date
 *                       description: Training Date
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
 *         description: EmpID/CourseID/SessionsID not found
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
 *                   example: "EmpID/CourseID/SessionsID not found"
 */
Courses.post("/register", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId, courseId, sessionId } = req.body;

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
  } else if (!empId || !courseId || !sessionId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "empId or Course or sessionId not found",
    });
  } else {
    const courseData = await course.findOne(
      { courseId: courseId, "sessions.sessionId": sessionId },
      { courseName: 1, "sessions.$": 1 }
    );

    const enrollment = await enrollments.find({ empId: empId });
    const sameDate: any = enrollment.map((item) => item.trainingDate);

    const status: any = courseData?.sessions.map((item) => item.status);
    const courseLeft: any = courseData?.sessions.map((item) => item.courseLeft);
    const courseLimit: any = courseData?.sessions.map(
      (item) => item.courseLimit
    );

    const trainingDate: any = courseData?.sessions.map(
      (item) => item.trainingDate
    );
    let hasSameDateError = false;

    for (let i = 0; i < sameDate.length; i++) {
      const trainingDateObj = new Date(trainingDate);
      const sameDateObj = new Date(sameDate[i]);
      if (trainingDateObj.toISOString() === sameDateObj.toISOString()) {
        hasSameDateError = true;
        break; // No need to continue the loop if the error is found
      }
    }
    if (hasSameDateError) {
      res.status(404).json({
        code: "404",
        status: "error",
        message: "same training date",
      });
    } else {
      if (status.toString() !== "active" || courseLimit - courseLeft === 0) {
        res.status(404).json({
          code: "404",
          status: "error",
          message: "this course is unavailable",
        });
      } else {
        const dbResults = await enrollments.create({
          empId: empId,
          courseId: courseId,
          sessionId: sessionId,
          trainingDate: trainingDate,
          status: "registered",
        });

        const newCourseLeft: Number = courseLeft[0] - 1;

        const session = await course.updateOne(
          { courseId: courseId, "sessions.sessionId": sessionId },
          { $set: { "sessions.$.courseLeft": newCourseLeft } }
        );

        const resultsData: responseData = {
          code: "200",
          status: "OK",
          data: { dbResults, session },
        };

        res.status(200).json(resultsData);
      }
    }
  }
});

/**
 * @swagger
 * /courses/results:
 *   post:
 *     summary: Emp Results Data
 *     tags:
 *       - Course
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
 *     responses:
 *       200:
 *         description: Successfully Get Data
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
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     sessionsId:
 *                       type: string
 *                       description: Session ID
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
 *         description: EmpID/CourseID/SessionsID not found
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
 *                   example: "EmpID not found"
 */
Courses.get("/results", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const empId = req.params;
  
  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
    };
    res.status(400).json(missingHeaders);
  } 
  else if (decoded.roles != "Emp") {
    const promis: responseError = {
      code: "400",
      status: "Failed",
      message: "Don't have promision",
    };
    res.status(400).json(promis);
  } 
  else if (!empId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpId not found",
    });
  } else {
    const dbResults = await courseResults.find({ empId: empId });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});
/**
 * @swagger
 * /courses/requests:
 *   post:
 *     summary: Emp Add/withdraw request
 *     tags:
 *       - Course
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
 *                 description: Employee ID to retrieve data for request
 *                 example: EMP001
 *               courseId:
 *                 type: string
 *                 description: course ID to retrieve data for request
 *                 example: C001
 *     responses:
 *       200:
 *         description: Successfully Request
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
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     sessionsId:
 *                       type: string
 *                       description: Session ID
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
 *         description: EmpID/CourseID not found
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
 *                   example: "EmpID/CourseID not found"
 */
Courses.post("/requests", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId, courseId, sessionId } = req.body;
  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
    };
    res.status(400).json(missingHeaders);
  } 
  else if (decoded.roles != "Emp") {
    const promis: responseError = {
      code: "400",
      status: "Failed",
      message: "Don't have promision",
    };
    res.status(400).json(promis);
  } else if (!empId || !courseId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpId/courseId not found",
    });
  } else {
    const findReq = await courseRequests.countDocuments({});
    const createReqid = "WR" + String(findReq + 1).padStart(3, "0");
    const dbResults = await courseRequests.create({
      reqId: createReqid,
      empId: empId,
      courseId: courseId,
      sessionId: sessionId,
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
/**
 * @swagger
 * /courses/browse:
 *   post:
 *     summary: Emp Course List
 *     tags:
 *       - Course
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
 *     responses:
 *       200:
 *         description: Successfully Get Data
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
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Name of the course
 *                     session:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Course results for the employee
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
 */
Courses.get("/browse", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  if (!contentType || contentType != "application/json") {
    const errorHeaderToken: responseError = {
      code: "400",
      status: "Failed",
      message: `Missing required headers: content-type and authorization token End-Point historyCourse`,
    };
    res.status(400).send(errorHeaderToken);
  } else if (decoded.roles != "Emp") {
    const promis: responseError = {
      code: "400",
      status: "Failed",
      message: "Don't have promision",
    };
    res.status(400).json(promis);
  } else {
    const dbResults = await course.find(
      { "sessions.status": "active" },
      {
        courseId:1,
        courseName:1,
        "sessions.$": 1,
      }
    );
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});
