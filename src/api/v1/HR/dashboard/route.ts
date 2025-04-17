import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { courseResults } from "../../Schema/courseResults";
import { reimbursements } from "../../Schema/reimbursement";
import { employees } from "../../Schema/emp";
import { course } from "../../Schema/course";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const dashBoard = express();
/**
 * @swagger
 * /dashBoard/dashBoard:
 *   get:
 *     summary: Checkdata Update CourseResult
 *     tags:
 *       - HR DashBoard
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
 *     responses:
 *       200:
 *         description: Successfully Update
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
 *                     allEmp:
 *                       type: number
 *                       description: All employee in database
 *                     empInactives:
 *                       type: number
 *                       description: How many Employees inactives in total
 *                     empActives:
 *                       type: number
 *                       description: How many Employees actives in total
 *                     courseRequests:
 *                       type: number
 *                       description: How many courseRequest in system
 *                     courseResults:
 *                       type: string
 *                       description: How many courseResult in system
 *                     reimbursement:
 *                       type: string
 *                       description: How many reimbursement in system
 *                     coursesAdd:
 *                       type: string
 *                       description: Completion Date
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *       400:
 *         description: Course result not found
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
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update"
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
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Don't have promision"
 *       500:
 *         description: Course result not found
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
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
dashBoard.get("/dashboard", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];

  if (!tokenkey ) {
    const verifyError: responseError = {
      code: "400",
      status: "Failed",
      message: "Missing or invalid headers: content-type and authorization are required.",
    };
    res.status(400).json(verifyError);
  } else {
    let decoded: any;
    try {
      decoded = jwt.verify(tokenkey, SECRET_KEY);
    } catch (err) {
      const invalidToken: responseError = {
        code: "401",
        status: "Unauthorized",
        message: "Invalid token.",
      };
      res.status(401).json(invalidToken);
      return;
    }

    if (decoded.roles !== "Hr") {
      const permissionError: responseError = {
        code: "403",
        status: "Unauthorized",
        message: "Don't have permission",
      };
      res.status(403).json(permissionError);
    } else {
      try {
        const [courseRequest, courseResult, reimbursement, employee, empInactive, empActive, courses] =
          await Promise.all([
            courseRequests.find({}),
            courseResults.find({}),
            reimbursements.find({}),
            employees.find({}),
            employees.find({ status: "inactive" }),
            employees.find({ status: "active" }),
            course.find({}),
          ]);

        const showDashboard: {} = {
          allEmps: employee.length,
          empInactives: empInactive.length,
          empActives: empActive.length,
          courseRequests: courseRequest.length,
          courseResults: courseResult.length,
          refunds: reimbursement.length,
          courses: courses.length,
        };

        const successData: responseData = {
          code: "200",
          status: "OK",
          data: showDashboard,
        };        
        res.status(200).json(successData);
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
  }
});

