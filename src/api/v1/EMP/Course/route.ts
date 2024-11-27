import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { enrollments } from "../../Schema/enrollment";
import { courseResults } from "../../Schema/courseResults";
export const Courses = express();

const verifyToken = (token: string | undefined): boolean => {
  const validToken = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  return token === validToken;
};

Courses.post("/register", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { empId, courseId, sessionId } = req.body;

  if (!tokenkey || !contentType) {
    res.status(401).json({
      code: "401",
      status: "error",
      message: "Unauthorized",
    });
  } else if (!empId || !courseId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpID/Course not found",
    });
  } else {
    const dbResults = await enrollments.create({
      courseId: courseId,
      sessionId: sessionId,
      status: "registered"
    });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});

Courses.get("/results", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const empID = req.params;
  if (!tokenkey || !contentType) {
    res.status(401).json({
      code: "401",
      status: "error",
      message: "Unauthorized",
    });
  } else if (!empID) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpID not found",
    });
  } else {
    const dbResults = await courseResults.find({ empID: empID });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});

Courses.post("/requests", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const { empID, courseID, sessionID } = req.body;
  if (!tokenkey || !contentType) {
    res.status(401).json({
      code: "401",
      status: "error",
      message: "Unauthorized",
    });
  } else if (!empID || !courseID) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpID/courseID not found",
    });
  } else {
    const findReq = await courseRequests.countDocuments({});
    const createReqid = "WR" + String(findReq + 1).padStart(3, "0");
    const dbResults = await courseRequests.create({
      reqId: createReqid,
      empID: empID,
      courseID: courseID,
      sessionID: sessionID,
      status: "pending",
    });
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults,
    };
    res.status(200).json(resultsData);
  }
});
