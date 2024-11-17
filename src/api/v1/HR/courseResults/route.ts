import express, { Request, Response } from "express";
import { responseData, responseError } from '../../model/model';
import mongoose from "mongoose";
export const courseUpdate = express();

const userSchemas = new mongoose.Schema({
  // coed: { type: String, required: true }
  code: String,
  firstName: String,
  lastName: String
}, { timestamps: true });

const results = mongoose.model("results", userSchemas);

//1.2.14 API : HR - Show Courses Results
courseUpdate.get("/results", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];

  if (!tokenkey || !contentType) {
    const errData: responseError = {
      message:
        "Missing required headers: content-type and authorization token End-Point courseUpdate HR - Show Courses results",
    };
    res.status(400).send(errData);
  }
  else {
    try {
      const dbResults = await results.find({})
      const resultsData: responseData = {
        code: "200",
        status: "OK",
        data: dbResults
      }
      res.status(200).json(resultsData)

    } catch (error) {
      console.log(error)
      const resultsError: responseError = {
        message: "Missing required Show results"
      }
      res.status(400).send(resultsError)
    }
  }
});

//1.2.15 API : HR - Show Courses Results ByID
courseUpdate.get("/resultsId/:id?", async (req: Request, res: Response) => {

  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { id } = req.params

  if (!tokenkey || !contentType) {
    const verify: responseError = {
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses Results ByID ",
    };
    res.status(500).send(verify);
  }
  else {
    if (!id) {
      const missingId: responseError = {
        message:
          "Missing reqId  No ID sent in",
      };
      res.status(400).send(missingId);
    }
    try {
      const dbResults = await results.find({ _id: id })
      // const dbResponse = await Users.find({ _id: id });
      console.log(dbResults)
      const resData: responseData = {
        code: "200",
        status: "OK",
        data: dbResults
      }
      res.status(200).json(resData)

    } catch (error) {
      console.log(error)
      const reqId: responseError = {
        message:
          `This ID cannot be found in the database ${error}`
      };
      res.status(400).send(reqId);
    }
  }

});

//1.2.16 API : HR - Show Courses Results ByID Update
courseUpdate.post("/update", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: string = reqHeader["authorization"];
  const { Id, status } = req.body

  if (!tokenkey || !contentType) {
    const errData: responseError = {
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ByID HR - Show Courses update",
    };
    res.status(400).json(errData);
  } else {
    if (!Id) {
      const missingId: responseError = {
        message: `Missing reqId  No ID sent in`
      }
      res.status(400).send(missingId)
    }
    try {
      const cerrenData = await results.find({ _id: Id })
      console.log(cerrenData)
      const updateData = await results.updateOne({ _id: Id },
        {
          $set: {
            code: status
          }
        })
      res.status(200).json(updateData)
    } catch (error) {
      console.log(error)
      const errorServer: responseError = {
        message: `This Id not found in database`
      }
      res.status(500).send(errorServer)
    }
  }
});
