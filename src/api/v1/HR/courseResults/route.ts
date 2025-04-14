import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import { courseResults } from "../../Schema/courseResults";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
import { enrollments } from "../../Schema/enrollment";
import { employees } from "../../Schema/emp";

export const courseResult = express();
/**
 * @swagger
 * /courseResult/results:
 *   post:
 *     summary: Checkdata All CourseResult
 *     tags:
 *       - HR CourseResult
 *     parameters:
 *       - in: header
 *         name: content-type
 *         required: true
 *         schema:
 *           type: string
 *         description: Specify the content type, e.g., application/json
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     requestBody:
 *       description: Request body containing the employee ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Successfully Request Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reqId:
 *                       type: string
 *                       description: Request ID
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     empName:
 *                       type: string
 *                       description: Employee Name
 *                     department:
 *                       type: string
 *                       description: Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Course Name
 *                     completionDate:
 *                       type: string
 *                       description: Completion Date
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *
 *       400:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Missing required headers: content-type and authorization token End-Point courseUpdate HR - Show Courses results"
 *       401:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "401"
 *                 status:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Cannot Show"
 *       500:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "500"
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
courseResult.get(
  "/results",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

    if (decoded.roles != "Hr") {
      const permission: responseError = {
        code: "401",
        status: "Unauthorized",
        message: "Don't have permission",
      };
      res.status(401).json(permission);
    } else {
      try {
        const dbResults = await courseResults.find({});
        const resultsData: responseData = {
          code: "200",
          status: "OK",
          data: dbResults,
        };
        res.status(200).json(resultsData);
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
/**
 * @swagger
 * /courseResult/resultsId/:reqId?:
 *   post:
 *     summary: Checkdata Employee Request
 *     tags:
 *       - HR CourseResult
 *     parameters:
 *       - in: header
 *         name: content-type
 *         required: true
 *         schema:
 *           type: string
 *         description: Specify the content type, e.g., application/json
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     requestBody:
 *       description: Request body containing the employee ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reqId:
 *                 type: string
 *                 description: Request ID to retrieve data for
 *                 example: R001
 *
 *     responses:
 *       200:
 *         description: Successfully Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reqId:
 *                       type: string
 *                       description: Request ID
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     empName:
 *                       type: string
 *                       description: Employee Name
 *                     department:
 *                       type: string
 *                       description: Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Course Name
 *                     completionDate:
 *                       type: string
 *                       description: Completion Date
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *       400:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Parameter 'reqId' is missing"
 *       401:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "401"
 *                 status:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Don't have permission"
 *       404:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "404"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "courseResult with Id '${reqId}' not found"
 *       500:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "500"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
//1.2.15 API : HR - Show Courses Results ById
courseResult.post(
  "/resultsId/",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const tokenkey: any = reqHeader["authorization"];
    const contentType: any = reqHeader["content-type"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { reqId } = req.body;
    if (!contentType || contentType != "application/json") {
      const missingHeaders: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update",
      };
      res.status(400).json(missingHeaders);
    } else {
      if (decoded.roles != "Hr") {
        const permission: responseError = {
          code: "401",
          status: "Unauthorized",
          message: "Don't have permission",
        };
        res.status(401).json(permission);
      } else {
        if (!reqId) {
          const missingId: responseError = {
            code: "400",
            status: "Failed",
            message: "Parameter 'reqId' is missing",
          };
          res.status(400).json(missingId);
        } else {
          try {
            const checkData = await courseResults.findOne({ reqId: reqId });
            if (!checkData) {
              const missingId: responseError = {
                code: "404",
                status: "Failed",
                message: `courseResult with Id '${reqId}' not found.`,
              };
              res.status(404).json(missingId);
            } else {
              const dbResults = await courseResults.find({ reqId: reqId });
              const resData: responseData = {
                code: "200",
                status: "OK",
                data: dbResults,
              };
              res.status(200).json(resData);
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
/**
 * @swagger
 * /courseResult/update:
 *   post:
 *     summary: Checkdata Update CourseResult
 *     tags:
 *       - HR CourseResult
 *     parameters:
 *       - in: header
 *         name: content-type
 *         required: true
 *         schema:
 *           type: string
 *         description: Specify the content type, e.g., application/json
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     requestBody:
 *       description: Request body containing the employee ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reqId:
 *                 type: string
 *                 description: Request ID to retrieve data for
 *                 example: R001
 *
 *     responses:
 *       200:
 *         description: Successfully Update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reqId:
 *                       type: string
 *                       description: Request ID
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     empName:
 *                       type: string
 *                       description: Employee Name
 *                     department:
 *                       type: string
 *                       description: Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Course Name
 *                     completionDate:
 *                       type: string
 *                       description: Completion Date
 *                     roles:
 *                       type: string
 *                       description: Employee Roles
 *                     status:
 *                       type: string
 *                       description: Status
 *       400:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update"
 *       401:
 *         description: Bad request - Missing Authorization or Content-Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "401"
 *                 status:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Don't have permission"
 *       404:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "404"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Id  ${reqId} : not found in the database."
 *       500:
 *         description: Course result not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "500"
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request. Please try again later"
 */
//1.2.16 API : HR - Show Courses Results ById Update
courseResult.post("/pass", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { reqId } = req.body;

  if (!contentType || contentType !== "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update",
    };
    res.status(400).json(missingHeaders);
  } else {
    if (decoded.roles !== "Hr") {
      const permission: responseError = {
        code: "401",
        status: "Unauthorized",
        message: "Don't have permission",
      };
      res.status(401).json(permission);
    } else {
      if (!reqId) {
        const missingId: responseError = {
          code: "400",
          status: "Failed",
          message: `Missing 'reqId' : req.body. No Id sent in request.`,
        };
        res.status(400).json(missingId);
      } else {
        try {
          const currrentId = await courseResults.findOne({ reqId: reqId });

          if (!currrentId) {
            const notFoundError: responseError = {
              code: "404",
              status: "Failed",
              message: `Id  ${reqId} : not found in the database.`,
            };
            res.status(404).json(notFoundError);
          } else if (
            currrentId.status !== "pending"
          ) {
            const notEditableError: responseError = {
              code: "403",
              status: "Failed",
              message: `Cannot modify request. This request has already been finalized.`,
            };
            res.status(403).json(notEditableError);
          } else {
            const empId = currrentId.empId;

            const updateData = await courseResults.updateOne(
              { reqId: reqId, status: "pending" },
              {
                $set: {
                  status: "pass",
                },
              }
            );

            const empData: any = await employees.findOne({ empId: empId });
            const firstTrainingDate = empData.firstTrainingDate;

            if (!firstTrainingDate) {
              await employees.updateOne(
                { empId: empId },
                {
                  $set: {
                    firstTrainingDate: new Date(),
                  },
                }
              );
            }

            const updateEmp = await employees.updateOne(
              { empId: empId },
              {
                $set: {
                  expiryDate: new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  ),
                },
              }
            );

            const updateEnrollment = await enrollments.updateOne(
              {
                empId: empId,
              },
              {
                $set: {
                  status: "pass",
                },
              }
            );

            const resData: responseData = {
              code: "200",
              status: "OK",
              data: { updateData, updateEnrollment },
            };

            res.status(200).json(resData);
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
});


courseResult.post("/fail", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: string = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { reqId } = req.body;

  if (!contentType || contentType !== "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Missing required headers: content-type and authorization token End-Point /requests ById HR - Show Courses update",
    };
    res.status(400).json(missingHeaders);
  } else {
    if (decoded.roles !== "Hr") {
      const permission: responseError = {
        code: "401",
        status: "Unauthorized",
        message: "Don't have permission",
      };
      res.status(401).json(permission);
    } else {
      if (!reqId) {
        const missingId: responseError = {
          code: "400",
          status: "Failed",
          message: `Missing 'reqId' : req.body. No Id sent in request.`,
        };
        res.status(400).json(missingId);
      } else {
        try {
          const currrentId = await courseResults.findOne({ reqId: reqId });

          if (!currrentId) {
            const notFoundError: responseError = {
              code: "404",
              status: "Failed",
              message: `Id ${reqId} : not found in the database.`,
            };
            res.status(404).json(notFoundError);
          } else if (
            currrentId.status !== "pending"
          ) {
            const notEditableError: responseError = {
              code: "403",
              status: "Failed",
              message: `Cannot modify request. This request has already been finalized.`,
            };
            res.status(403).json(notEditableError);
          } else {
            const updateData = await courseResults.updateOne(
              { reqId: reqId },
              {
                $set: {
                  status: "fail",
                },
              }
            );

            const empId = currrentId.empId;
            const updateEnrollment = await enrollments.updateOne(
              {
                empId: empId,
              },
              {
                $set: {
                  status: "fail",
                },
              }
            );

            const resData: responseData = {
              code: "200",
              status: "OK",
              data: { updateData, updateEnrollment },
            };

            res.status(200).json(resData);
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
});

