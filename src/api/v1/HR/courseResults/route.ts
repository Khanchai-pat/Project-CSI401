import express, { Request, Response } from "express";
import { responseData, responseError } from '../../interfaceRes/response';

export const courseUpdate = express();
import { courseResults } from "../../Schema/courseResults"

//1.2.14 API : HR - Show Courses Results
courseUpdate.get("/results", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];


  if (!tokenkey || !contentType) {
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

//1.2.15 API : HR - Show Courses Results ByID
courseUpdate.get("/resultsId/:reqid?", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { reqid } = req.params

  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "500",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses Results ByID ",
    };
    res.status(400).json(missingHeaders)
  }
  else {
    if (!reqid) {
      const missingId: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Parameter 'reqid' is missing",
      };
      res.status(400).json(missingId);
    } else {
      try {
        const checkData = await courseResults.findOne({ reqid: reqid })
        if (!checkData) {
          const missingId: responseError = {
            code: "404",
            status: "Failed",
            message: `Employee with ID '${reqid}' not found.`,
          };
          res.status(404).json(missingId);
        } else {
          const dbResults = await courseResults.find({ reqid: reqid })
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

//1.2.16 API : HR - Show Courses Results ByID Update
courseUpdate.post("/update", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];
  const { reqid, status } = req.body

  if (!tokenkey || !contentType) {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses update",
    };
    res.status(400).json(missingHeaders);
  } else {
    if (!reqid) {
      const missingId: responseError = {
        code: "400",
        status: "Failed",
        message: `Missing 'reqId' : req.body. No ID sent in request.`,
      };
      res.status(400).json(missingId)
    } else {
      try {
        const cerrenId = await courseResults.findOne({ reqid: reqid })
        if (!cerrenId) {
          const notFoundError: responseError = {
            code: "404",
            status: "Failed",
            message: `ID  ${reqid} : not found in the database.`,
          };
          res.status(404).json(notFoundError);
        } else {
          const updateData = await courseResults.updateOne({ reqid: reqid }, req.body)
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
