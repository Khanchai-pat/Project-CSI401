import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
export const checkData = express();
import { employees } from "../../Schema/emp";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
import { getDiffAsText, getTrainingDuration } from "../../utils/dateUtils";
import { courseResults } from "../../Schema/courseResults";

// const SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultSecretKey";

/**
 * @swagger
 * /checkData/checkEmp:
 *   get:
 *     summary: Checkdata All Employee
 *     tags:
 *       - HR Checkdata
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
 *
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
 *                     tel:
 *                       type: string
 *                       description: Employee Telephone number
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *       401:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "401"
 *                 status:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Cannot Show"
 *       500:
 *         description: EmpID/CourseID/bankAccount not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "500"
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
// Check Data EMP
checkData.get("/checkEmp", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

  if (decoded.roles !== "Hr") {
    const promis: responseError = {
      code: "401",
      status: "Unauthorized",
      message: "Don't have promision",
    };
    res.status(401).json(promis);
  } else {
    try {
      // Process
      const dbResponse = await employees.find({});
      const reqCheckData: responseData = {
        code: "200",
        status: "Employee data retrieved successfully",
        data: dbResponse,
      };
      res.status(200).json(reqCheckData);
    } catch (error) {
      console.log(error);
      const serverError: responseError = {
        code: "500",
        status: "Failed",
        message:
          "An error occurred while processing your request. Please try again later",
      };
      res.status(500).json(serverError);
    }
  }
});

/**
 * @swagger
 * /checkData/checkEmpId/:empId?:
 *   get:
 *     summary: Checkdata By EmpID
 *     tags:
 *       - HR Checkdata
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
 *       - in: path
 *         name: empId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID to retrieve data for
 *         example: EMP001
 *     responses:
 *       200:
 *         description: Successfully CheckData
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
 *                     tel:
 *                       type: string
 *                       description: Employee Telephone number
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *       401:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "401"
 *                 status:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Cannot Show"
 *       500:
 *         description: EmpID/CourseID/bankAccount not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "500"
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
// Check Data by Employee Id
checkData.post(
  "/checkEmpId",
  verifyToken,
  async (req: Request, res: Response): Promise<any> => {
    const reqHeader: any = req.headers;
    const tokenkey: any = reqHeader["authorization"];
    const contentType: any = reqHeader["content-type"];
    const decode: any = jwt.verify(tokenkey, SECRET_KEY);
    const { empId } = req.body;

    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmpId.",
      });
    }

    if (decode.roles !== "Hr") {
      return res.status(401).json({
        code: "401",
        status: "Unauthorized",
        message: "Don't have permission",
      });
    }

    if (!empId) {
      return res.status(400).json({
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing 'empId' parameter for endpoint /checkempId.",
      });
    }

    try {
      const employee: any = await employees.findOne({ empId });
      if (!employee) {
        return res.status(404).json({
          code: "404",
          status: "Not Found",
          message: `Employee with Id '${empId}' not found.`,
        });
      }

      const courseResult: any = await courseResults
        .findOne({ empId })
        .sort({ _id: -1 });

      const trainingDate = courseResult?.trainingDate || null;
      const trainingDuration = trainingDate
        ? getTrainingDuration(trainingDate)
        : "ไม่มีข้อมูล";

      const expiry = employee?.expiryDate;
      const today = new Date();

      const nextExpiryDate = getDiffAsText(today, expiry);

      const empData = {
        ...employee.toObject(),
        nextExpiryDate,
        trainingDuration,
      };

      return res.status(200).json({
        code: "200",
        status: "success",
        data: empData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: "500",
        status: "Failed",
        message:
          "An error occurred while processing your request. Please try again later",
      });
    }
  }
);
