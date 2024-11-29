import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { employees } from "../../Schema/emp";
import { courseResults } from "../../Schema/courseResults";
import { enrollments } from "../../Schema/enrollment";
import { course } from "../../Schema/course";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const checkdata = express();

/**
 * @swagger
 * /checkdata/dashboard:
 *   post:
 *     summary: Fetch employee data and course results
 *     tags:
 *       - Emp Checkdata
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
 *         description: Successfully fetched employee data and course results
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
 *                     empData:
 *                       type: object
 *                       description: Employee data
 *                     courseResult:
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
 *       404:
 *         description: Employee ID not found
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

checkdata.post("/dashboard", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  // const empId = req.query.Empid as string;
  const { empId } = req.body;

  // ตรวจสอบการมี empId ในคำขอและเช็ค contentType
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
      message: "EmpID not found",
    });
  } else {
    // สร้างข้อมูล response
    const courseResult = await courseResults
      .find({ empId: empId })
      .sort({ _id: -1 });

    res.status(200).json({
      code: "200",
      status: "success",
      data: courseResult,
    });
  }
});

/**
 * @swagger
 * /checkdata/enrollments:
 *   post:
 *     summary: Fetch employee data and course List
 *     tags:
 *       - Emp Checkdata
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
 *         description: Successfully fetched employee data and course results
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
 *                     empData:
 *                       type: object
 *                       description: Employee data
 *                     courseList:
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
 *       404:
 *         description: Employee ID not found
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
checkdata.post("/enrollments", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  // const empId = req.query.Empid as string;
  const { empId } = req.body;

  // ตรวจสอบการมี empId ในคำขอและเช็ค contentType
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
      message: "EmpId not found",
    });
  } else {
    const enrollment = await enrollments.find({
      empId: empId,
      status: { $in: ["registered", "pending"] },
    });

    res.status(200).json({
      code: "200",
      status: "success",
      data: enrollment
    });
  }
});
/**
 * @swagger
 * /checkdata/profile:
 *   post:
 *     summary: Emp Profile
 *     tags:
 *       - Emp Checkdata
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
 *         description: Successfully fetched employee data and course results
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
 *                     empData:
 *                       type: object
 *                       description: Employee data      
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
 *         description: Employee ID not found
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
checkdata.post("/profile", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId } = req.body;

  // ตรวจสอบการมี empId ในคำขอและเช็ค contentType
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
      message: "EmpID not found",
    });
  } else {
    // สร้างข้อมูล response
    const empData = await employees.findOne({
      empId: empId,
    });

    res.status(200).json({
      code: "200",
      status: "success",
      data: empData,
    });
  }
});
