import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseRequests } from "../../Schema/courseRequest";
import { enrollments } from "../../Schema/enrollment";
import { courseResults } from "../../Schema/courseResults";
import { course } from "../../Schema/course";
import { enrollment } from "../../HR/enrollment/route";
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
  } else if (!empId || !courseId || !sessionId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "empId or Course or sessionId not found",
    });
  } else {
    const courseData = await course.findOne(
      { courseId: courseId, "sessions.sessionId": sessionId },
      { courseName: 1, "sessions.$": 1 }
    );

    const enrollment = await enrollments.find({ empId: empId });
    const sameDate: any = enrollment.map((item) => item.trainingDate);

    const status: any = courseData?.sessions.map((item) => item.status);
    const courseLeft: any = courseData?.sessions.map((item) => item.courseLeft);
    const courseLimit: any = courseData?.sessions.map(
      (item) => item.courseLimit
    );

    const trainingDate: any = courseData?.sessions.map(
      (item) => item.trainingDate
    );
    let hasSameDateError = false;

    for (let i = 0; i < sameDate.length; i++) {
      const trainingDateObj = new Date(trainingDate);
      const sameDateObj = new Date(sameDate[i]);
      if (trainingDateObj.toISOString() === sameDateObj.toISOString()) {
        hasSameDateError = true;
        break; // No need to continue the loop if the error is found
      }
    }
    if (hasSameDateError) {
      res.status(404).json({
        code: "404",
        status: "error",
        message: "same training date",
      });
    } else {
      if (status.toString() !== "active" || courseLimit - courseLeft === 0) {
        res.status(404).json({
          code: "404",
          status: "error",
          message: "this course is unavailable",
        });
      } else {
          const dbResults = await enrollments.create({
            empId: empId,
            courseId: courseId,
            sessionId: sessionId,
            trainingDate:trainingDate,
            status: "registered",
          });

          const newCourseLeft: Number = courseLeft[0] - 1;

          const session = await course.updateOne(
            { courseId: courseId, "sessions.sessionId": sessionId },
            { $set: { "sessions.$.courseLeft": newCourseLeft } }
        );

        const resultsData: responseData = {
          code: "200",
          status: "OK",
          data: { dbResults, session },
        };

        res.status(200).json(resultsData);
      }
    }
  }
});

Courses.get("/results", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const empId = req.params;
  if (!tokenkey || !contentType) {
    res.status(401).json({
      code: "401",
      status: "error",
      message: "Unauthorized",
    });
  } else if (!empId) {
    res.status(404).json({
      code: "404",
      status: "error",
      message: "EmpId not found",
    });
  } else {
    const dbResults = await courseResults.find({ empId: empId });
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
      message: "EmpId/courseId not found",
    });
  } else {
    const findReq = await courseRequests.countDocuments({});
    const createReqid = "WR" + String(findReq + 1).padStart(3, "0");
    const dbResults = await courseRequests.create({
      reqId: createReqid,
      empId: empId,
      courseId: courseId,
      sessionId: sessionId,
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
