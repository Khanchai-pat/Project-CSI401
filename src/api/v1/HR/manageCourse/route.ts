import express, { Response, Request } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { course } from "../../Schema/course";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const courses = express();

courses.get("/showCourse", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed",
    };
    res.status(400).json(missingHeaders);
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
        // Process
        const currentCourse = await course.find({});
        const reqCheckData: responseData = {
          code: "200",
          status: "showCourse data retrieved successfully",
          data: currentCourse,
        };
        res.status(200).json(reqCheckData);
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

courses.post(
  "/courseDetail",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { courseId, sessionId } = req.body;

    if (!contentType || contentType != "application/json") {
      const missingHeaders: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed ",
      };
      res.status(400).json(missingHeaders);
    } else {
      if (decoded.roles != "Hr") {
        const promis: responseError = {
          code: "400",
          status: "Failed",
          message: "Don't have promision",
        };
        res.status(400).json(promis);
      } else {
        if (!courseId) {
          const missingParamError: responseError = {
            code: "400",
            status: "Failed",
            message: `Bad Request: Missing 'empId' parameter for endpoint`,
          };
          res.status(400).json(missingParamError);
        } else {
          try {
            const currentCourse = await course.find({ courseId: courseId });
            if (!currentCourse) {
              // กรณีไม่มีข้อมูลที่ตรงกับ empId
              const noDataError: responseError = {
                code: "404",
                status: "Not Found",
                message: `course with courseId '${courseId}' not found.`,
              };
              res.status(404).json(noDataError);
            } else {
              const courseDetails = await course.find(
                {
                  courseId: courseId,
                  "sessions.sessionId": sessionId,
                },
                {
                  courseName: 1,
                  "sessions.$": 1,
                }
              );
              const checkempId: responseData = {
                code: "200",
                status: "Success",
                data: courseDetails,
              };
              res.status(200).json(checkempId);
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

courses.post(
  "/createCourse",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

    const { courseId, courseName }: any = req.body;

    if (contentType !== "application/json" || !tokenkey) {
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
        if (!courseId || !courseName) {
          const incompleteDataError: responseError = {
            code: "400",
            status: "Failed",
            message:
              "Incomplete data provided. Please ensure all required fields are filled in",
          };
          res.status(400).json(incompleteDataError);
        } else {
          try {
            const currentData = await course.findOne({
              $or: [{ courseId: courseId }, { courseName: courseName }],
            });
            if (!currentData) {
              const addCourse = await course.create({
                courseId: courseId,
                courseName: courseName,
                sessions: [],
              });
              const successData: responseData = {
                code: "200",
                status: "OK",
                data: {
                  addCourse,
                },
              };
              res.status(200).json(successData);
            } else {
              const duplicateDataError: responseError = {
                code: "400",
                status: "Failed",
                message:
                  "Duplicate data found. The provided employee information already exists in the system",
              };
              res.status(400).json(duplicateDataError);
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

courses.post(
  "/addSession",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const {
      courseId,
      sessionId,
      trainingDate,
      trainingLocation,
      periods,
      hours,
      courseLimit,
      status,
    }: any = req.body;

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
        if (
          !courseId ||
          !sessionId ||
          !trainingDate ||
          !trainingLocation ||
          !periods ||
          !hours ||
          !courseLimit ||
          !status
        ) {
          const incompleteDataError: responseError = {
            code: "400",
            status: "Failed",
            message:
              "Incomplete data provided. Please ensure all required fields are filled in",
          };
          res.status(400).json(incompleteDataError);
        } else {
          try {
            const cerrenCourse = await course.findOne({ courseId: courseId });
            // console.log(cerrenCourse)
            if (!cerrenCourse) {
              const missingId: responseError = {
                code: "404",
                status: "Failed",
                message: `with Id '${courseId}' not found.`,
              };
              res.status(404).json(missingId);
            } else {
              const isDuplicateSession = cerrenCourse.sessions.some(
                (session: any) => session.sessionId === sessionId
              );

              if (isDuplicateSession) {
                const duplicateSessionError: responseError = {
                  code: "409",
                  status: "Failed",
                  message: `Session Id '${sessionId}' already exists in the course.`,
                };
                res.status(409).json(duplicateSessionError);
              } else {
                const addSession = {
                  sessionId: sessionId,
                  trainingDate: trainingDate,
                  trainingLocation: trainingLocation,
                  periods: periods,
                  hours: hours,
                  courseLimit: courseLimit,
                  courseLeft: courseLimit,
                  status: status,
                };
                const updateData = await course.updateOne(
                  { courseId: courseId },
                  {
                    $push: {
                      sessions: addSession,
                    },
                  }
                );
                const successData: responseData = {
                  code: "200",
                  status: "OK",
                  data: updateData,
                };
                res.status(200).json(successData);
              }
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

courses.post(
  "/closeCourse",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { courseId, status }: any = req.body;

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
          const cerrenCourse = await course.findOne({ courseId: courseId });
          // console.log(cerrenCourse)
          if (!cerrenCourse) {
            const missingId: responseError = {
              code: "404",
              status: "Failed",
              message: `with Id '${courseId}' not found.`,
            };
            res.status(404).json(missingId);
          } else {
            const setCourse = await course.updateOne(
              { courseId: courseId },
              {
                $set: {
                  status: status,
                },
              }
            );
            const successData: responseData = {
              code: "200",
              status: "OK",
              data: setCourse,
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
);

courses.post("/editCouse", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const {
    courseId,
    sessionId,
    trainingDate,
    trainingLocation,
    periods,
    hours,
    courseLimit,
    courseLeft,
    status,
  }: any = req.body;

  if (!contentType || contentType != "application/json") {
    const missingHeadersError: responseError = {
      code: "400",
      status: "Failed",
      message: "Missing required headers: content-type and authorization token",
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
        const cerrenCourse = await course.findOne({ courseId: courseId });
        // console.log(cerrenCourse)
        if (!cerrenCourse) {
          const missingId: responseError = {
            code: "404",
            status: "Failed",
            message: `with Id '${courseId}' courseId not found.`,
          };
          res.status(404).json(missingId);
        } else {
          const curSessionsid = cerrenCourse.sessions.some(
            (session: any) => session.sessionId === sessionId
          );
          if (!curSessionsid) {
            const missingId: responseError = {
              code: "404",
              status: "Failed",
              message: `with Id '${sessionId}' sessionId not found.`,
            };
            res.status(404).json(missingId);
          } else {
            const updateSesion = await course.updateOne(
              {
                courseId: courseId,
                "sessions.sessionId": sessionId,
              },
              {
                $set: {
                  "sessions.$.trainingDate": trainingDate,
                  "sessions.$.trainingLocation": trainingLocation,
                  "sessions.$.periods": periods,
                  "sessions.$.hours": hours,
                  "sessions.$.courseLimit": courseLimit,
                  "sessions.$.courseLeft": courseLeft,
                  "sessions.$.status": status,
                },
              }
            );
            const successData: responseData = {
              code: "200",
              status: "OK",
              data: updateSesion,
            };
            res.status(200).json(successData);
          }
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
});