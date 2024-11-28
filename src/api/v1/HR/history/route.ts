import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { courseResults } from "../../Schema/courseResults";
import { reimbursements } from "../../Schema/reimbursement";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
// const tokenkey: any = reqHeader["authorization"];
//     const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
// if (decoded.roles != "Hr") {
//     const promis: responseError = {
//       code: "400",
//       status: "Failed",
//       message: "Don't have promision",
//     };
//     res.status(400).json(promis);
export const history = express();

//course request approved
history.get("/course", verifyToken, async (req: Request, res: Response) => {
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
        const dbHistorys = await courseRequests.find({});
        const successData: responseData = {
          code: "200",
          status: "OK",
          data: dbHistorys,
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

//
history.get("/results", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { status }: any = req.body;
  if (!contentType || contentType != "application/json") {
    const errorHeaderToken: responseError = {
      code: "400",
      status: "Failed",
      message: `Missing required headers: content-type and authorization token End-Point historyCou?`,
    };
    res.status(400).send(errorHeaderToken);
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
        const dbHistorys = await courseResults.find({});
        const successData: responseData = {
          code: "200",
          status: "OK",
          data: dbHistorys,
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

history.get(
  "/reimbursement",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    if (!contentType || contentType != "application/json") {
      const errorHeaderToken: responseError = {
        code: "400",
        status: "Failed",
        message: `Missing required headers: content-type and authorization token End-Point historyCou?`,
      };
      res.status(400).send(errorHeaderToken);
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
          const dbHistorys = await reimbursements.find({});
          const successData: responseData = {
            code: "200",
            status: "OK",
            data: dbHistorys,
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
