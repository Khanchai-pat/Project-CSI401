import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { courseResults } from "../../Schema/courseResults";
import { reimbursements } from "../../Schema/reimbursement";
import { employees } from "../../Schema/emp";
import { course } from "../../Schema/course";
import { verifyToken } from "../../middleware/route";
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
 *                       type: Number
 *                       description: All employee in database
 *                     empInactives:
 *                       type: Number
 *                       description: How many Employees inactives in total
 *                     empActives:
 *                       type: Number
 *                       description: How many Employees actives in total
 *                     courseRequests:
 *                       type: Number
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
dashBoard.get(
  "/dashBoard",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

    if (!contentType || contentType != "application/json") {
      const verifyError: responseError = {
        code: "400",
        status: "Failed",
        message: "missing quried header : contentType And tokenKey",
      };
      res.status(400).json(verifyError);
    } else {
      if (decoded.roles != "Hr") {
        const promis: responseError = {
          code: "401",
          status: "Unauthorized",
          message: "Don't have promision",
        };
        res.status(401).json(promis);
      } else {
        try {
          const courseRequest = await courseRequests.find({});
          let allCourseRequest: any = 0;
          for (let i = 0; i <= courseRequest.length; i++) {
            allCourseRequest = i;
          }

          let allCourseResult: any = 0;
          const courseResult = await courseResults.find({});
          for (let i = 0; i <= courseResult.length; i++) {
            allCourseResult = i;
          }

          let allRefund: any = 0;
          const refunds = await reimbursements.find({});
          for (let i = 0; i <= refunds.length; i++) {
            allRefund = i;
          }

          let allEmp: any = 0;
          const employee = await employees.find({});
          for (let i = 0; i <= employee.length; i++) {
            allEmp = i;
          }

          const empInactive = await employees.find({ status: "inactive" });
          let inactives: any = 0;
          for (let i = 0; i <= empInactive.length; i++) {
            inactives = i;
          }

          const empActive = await employees.find({ status: "active" });
          let Actives: any = 0;
          for (let i = 0; i <= empActive.length; i++) {
            Actives = i;
          }
          const courses = await course.find({});
          let allCourse: any = 0;
          for (let i = 0; i <= courses.length; i++) {
            allCourse = i;
          }
          const showDashboard: {} = {
            allEmps: allEmp,
            empInactives: inactives,
            empActives: Actives,
            courseRequests: allCourseRequest,
            courseResults: allCourseResult,
            refunds: allRefund,
            courses: allCourse,
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
  }
);
