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
          code: "400",
          status: "Failed",
          message: "Don't have promision",
        };
        res.status(400).json(promis);
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
