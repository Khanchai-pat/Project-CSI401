import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { enrollments } from "../../Schema/enrollment";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const withdrawRequest = express();

withdrawRequest.get(
  "/requests",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

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
        try {
          const courseRequestData = await courseRequests.find({});
          const successResponse: responseData = {
            code: "200",
            status: "OK",
            data: courseRequestData,
          };
          res.status(200).json(successResponse);
        } catch (error) {
          console.error(error);
          const databaseError: responseError = {
            code: "500",
            status: "Failed",
            message: "Internal server error while retrieving course requests.",
          };
          res.status(500).json(databaseError);
        }
      }
    }
  }
);

////Show list requests By Id
withdrawRequest.get(
  "/requestsId/:reqId?",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId }: any = req.params;
    console.log(reqId);

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
          const missingParamsError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required parameter: reqId",
          };
          res.status(400).json(missingParamsError);
        } else {
          try {
            const checkId = await courseRequests.findOne({ reqId: reqId });
            if (!checkId) {
              const idNotFoundError: responseError = {
                code: "404",
                status: "Failed",
                message: `The requested data with the provided Id '${reqId}' could not be found`,
              };
              res.status(404).send(idNotFoundError);
            } else {
              const dbRequestsId = await courseRequests.find({ reqId: reqId });
              const response: responseData = {
                code: "200",
                status: "OK",
                data: dbRequestsId,
              };
              res.status(200).json(response);
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

//Show list request ById appove
withdrawRequest.post(
  "/appoved",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId, empId }: any = req.body;

    if (!contentType || contentType != "application/json") {
      const errorHeaderToken: responseError = {
        code: "400",
        status: "Failed",
        message: `Missing required headers: content-type and authorization token End-Point appove:id?`,
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
        if (!reqId) {
          const missingParamsError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required parameter: reqId",
          };
          res.status(400).json(missingParamsError);
        } else {
          try {
            const checkId = await courseRequests.findOne({ reqId: reqId });
            if (!checkId) {
              const idNotFoundError: responseError = {
                code: "404",
                status: "Failed",
                message: `The requested data with the provided Id :: ${reqId} could not be found`,
              };
              res.status(404).send(idNotFoundError);
            } else {
              const dbAppove = await courseRequests.updateOne(
                { reqId: reqId },
                {
                  $set: {
                    status: "appove",
                  },
                }
              );

              // const dbCancle = await enrollments.updateOne({
              //     empId: empId

              // }, {
              //     $set: {
              //         status: "Cencle"
              //     }
              // })
              res.status(200).json(dbAppove);
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

// Show list request ById reject
withdrawRequest.post(
  "/denied",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    // const tokenkey: any = reqHeader["token-key"]
    const { reqId }: any = req.body;

    if (!contentType || contentType != "application/json") {
      const errorHeaderToken: responseError = {
        code: "400",
        status: "Failed",
        message: `Missing required headers: content-type and authorization token End-Point appove reqId?`,
      };
      res.status(400).send(errorHeaderToken);
    } else {
      if (!reqId) {
        const missingParamsError: responseError = {
          code: "400",
          status: "Failed",
          message: "Missing required parameter: reqId",
        };
        res.status(400).json(missingParamsError);
      } else {
        try {
          const checkId = await courseRequests.findOne({ reqId: reqId });
          if (!checkId) {
            const idNotFoundError: responseError = {
              code: "404",
              status: "Failed",
              message: `The requested data with the provided Id :${reqId} could not be found`,
            };
            res.status(404).send(idNotFoundError);
          } else {
            const dbAppove = await courseRequests.updateOne(
              { reqId: reqId },
              {
                $set: {
                  status: "denied",
                },
              }
            );
            res.status(200).json(dbAppove);
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
);
