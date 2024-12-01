import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { reimbursements } from "../../Schema/reimbursement";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const reimbursement = express();

reimbursement.get(
  "/requests",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    if (decoded.roles != "Hr") {
      const promis: responseError = {
        code: "400",
        status: "Failed",
        message: "Don't have promision",
      };
      res.status(400).json(promis);
    } else {
      try {
        const dbrequests = await reimbursements.find({});
        console.log(dbrequests);
        const successData: responseData = {
          code: "200",
          status: "OK",
          data: dbrequests,
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
);

////1.2.12 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Show List byId
reimbursement.post(
  "/requestsId/",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId }: any = req.body;

    if (!contentType || contentType !== "application/json") {
      const missingHeadersError: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Missing required headers: content-type and authorization token",
      };
      res.status(400).json(missingHeadersError);
    } else {
      if (decoded.roles != "Hr") {
        const promis: responseError = {
          code: "400",
          status: "Failed",
          message: "Don't have promision",
        };
        res.status(400).json(promis);
      } else {
        if (!reqId) {
          const missingRefIdError: responseError = {
            code: "400",
            status: "Failed",
            message: `Missing required reqId : parameter in the request`,
          };
          res.status(400).send(missingRefIdError);
        } else {
          try {
            const checkId = await reimbursements.findOne({ reqId: reqId });
            if (!checkId) {
              const idNotFoundError: responseError = {
                code: "404",
                status: "Failed",
                message: `The requested data with the provided Id '${reqId}'could not be found`,
              };
              res.status(404).send(idNotFoundError);
            } else {
              const refundRequestsById = await reimbursements.find({
                reqId: reqId,
              });
              // console.log(refundRequestsById)
              const successData: responseData = {
                code: "200",
                status: "OK",
                data: refundRequestsById,
              };
              res.status(200).json(successData);
            }
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
  }
);

//1.2.13 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Appove
reimbursement.post(
  "/approved",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId, status }: any = req.body;

    if (!contentType || contentType != "application/json") {
      const missingHeadersError: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Missing required headers: content-type and authorization token",
      };
      res.status(400).json(missingHeadersError);
    } else {
      if (decoded.roles != "Hr") {
        const promis: responseError = {
          code: "400",
          status: "Failed",
          message: "Don't have promision",
        };
        res.status(400).json(promis);
      } else {
        if (!reqId) {
          const missingRefIdError: responseError = {
            code: "400",
            status: "Failed",
            message: `Missing required reqId : parameter in the request`,
          };
          res.status(400).send(missingRefIdError);
        } else {
          try {
            const checkId = await reimbursements.findOne({ reqId: reqId });
            if (!checkId) {
              const idNotFoundError: responseError = {
                code: "404",
                status: "Failed",
                message: `The requested data with the provided Id : ${reqId} could not be found`,
              };
              res.status(404).send(idNotFoundError);
            } else {
              const dbAppove = await reimbursements.updateOne(
                { reqId: reqId },
                {
                  $set: {
                    status: "approved",
                  },
                }
              );
              const successData: responseData = {
                code: "200",
                status: "OK",
                data: dbAppove,
              };
              res.status(200).json(successData);
            }
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
  }
);

//1.2.14 API : HR - Courses Fee Reimbursement System (FR5: ระบบเบิกค่าอบรม) Reject
reimbursement.post(
  "/denied",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId, remark }: any = req.body;

    if (!contentType || contentType != "application/json") {
      const missingHeadersError: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Missing required headers: content-type and authorization token",
      };
      res.status(400).json(missingHeadersError);
    } else {
      if (decoded.roles != "Hr") {
        const promis: responseError = {
          code: "400",
          status: "Failed",
          message: "Don't have promision",
        };
        res.status(400).json(promis);
      } else {
        if (!reqId) {
          const missingRefIdError: responseError = {
            code: "400",
            status: "Failed",
            message: `Missing required reqId : parameter in the request`,
          };
          res.status(400).send(missingRefIdError);
        } else {
          try {
            const checkId = await reimbursements.findOne({
              reqId: reqId,
              status: "pending",
            });
            if (!checkId) {
              const idNotFoundError: responseError = {
                code: "404",
                status: "Failed",
                message: `The requested data with the provided Id : ${reqId} could not be found`,
              };
              res.status(404).send(idNotFoundError);
            } else {
              const dbAppove = await reimbursements.updateOne(
                { reqId: reqId },
                {
                  $set: {
                    remark: remark,
                    status: "denied",
                  },
                }
              );
              const successData: responseData = {
                code: "200",
                status: "OK",
                data: dbAppove,
              };
              res.status(200).json(successData);
            }
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
  }
);
