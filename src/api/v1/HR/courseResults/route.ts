import express, { Request, Response } from "express";
import { responseData, responseError } from '../../interfaceRes/response';
import { courseResults } from "../../Schema/courseResults"
import { verifyToken } from "../../middleware/route";
//1.2.14 API : HR - Show Courses Results

export const courseResult = express();

courseResult.get("/results", verifyToken, async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  // const tokenkey: string = reqHeader["token-key"];


  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message: "Missing required headers: content-type and authorization token End-Point courseUpdate HR - Show Courses results"
    };
    res.status(400).json(missingHeaders);
  } else {
    try {
      const dbResults = await courseResults.find({})
      const resultsData: responseData = {
        code: "200",
        status: "OK",
        data: dbResults
      }
      res.status(200).json(resultsData)

    } catch (error) {
      console.log(error)
      const serverError: responseError = {
        code: "500",
        status: "Failed",
        message: "An error occurred while processing your request. Please try again later"
      };
      res.status(500).json(serverError);
    }
  }
});

//1.2.15 API : HR - Show Courses Results ById
courseResult.get("/resultsId/:reqId?", verifyToken, async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  // const tokenkey: any = reqHeader["token-key"];
  const { reqId } = req.params

  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "500",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses Results ById ",
    };
    res.status(400).json(missingHeaders)
  }
  else {
    if (!reqId) {
      const missingId: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Parameter 'reqId' is missing",
      };
      res.status(400).json(missingId);
    } else {
      try {
        const checkData = await courseResults.findOne({ reqId: reqId })
        if (!checkData) {
          const missingId: responseError = {
            code: "404",
            status: "Failed",
            message: `courseResult with Id '${reqId}' not found.`,
          };
          res.status(404).json(missingId);
        } else {
          const dbResults = await courseResults.find({ reqId: reqId })
          const resData: responseData = {
            code: "200",
            status: "OK",
            data: dbResults
          }
          res.status(200).json(resData)
        }
      } catch (error) {
        console.log(error)
        const serverError: responseError = {
          code: "500",
          status: "Failed",
          message: "An error occurred while processing your request. Please try again later"
        };
        res.status(500).json(serverError);
      }
    }
  }
});

//1.2.16 API : HR - Show Courses Results ById Update
courseResult.post("/update", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  // const tokenkey: string = reqHeader["token-key"];
  const { reqId } = req.body

  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update",
    };
    res.status(400).json(missingHeaders);
  } else {
    if (!reqId) {
      const missingId: responseError = {
        code: "400",
        status: "Failed",
        message: `Missing 'reqId' : req.body. No Id sent in request.`,
      };
      res.status(400).json(missingId)
    } else {
      try {
        const cerrenId = await courseResults.findOne({ reqId: reqId })
        if (!cerrenId) {
          const notFoundError: responseError = {
            code: "404",
            status: "Failed",
            message: `Id  ${reqId} : not found in the database.`,
          };
          res.status(404).json(notFoundError);
        } else {
          const updateData = await courseResults.updateOne({ reqId: reqId }, {
            $set: {
              status: "complete"
            }
          })
          res.status(200).json(updateData)
        }
      } catch (error) {
        console.log(error)
        const serverError: responseError = {
          code: "500",
          status: "Failed",
          message: "An error occurred while processing your request. Please try again later"
        };
        res.status(500).json(serverError);
      }
    }
  }
});
