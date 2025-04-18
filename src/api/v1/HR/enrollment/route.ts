import express, { Request, Response } from "express";
import { enrollments } from "../../Schema/enrollment";
import { responseData, responseError } from "../../interfaceRes/response";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";

export const enrollment = express();

/**
 * @swagger
 * /enrollment/showEnrollment:
 *   get:
 *     summary: Show Enrollment
 *     tags:
 *       - HR Enrollment
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
 *     responses:
 *       200:
 *         description: Successfully Show Enrollment
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
 *                     empId:
 *                       type: string
 *                       description: Employee ID
 *                     empName:
 *                       type: string
 *                       description: Employee Name
 *                     department:
 *                       type: string
 *                       description: Employee Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Name of a course
 *                     sessionsId:
 *                       type: string
 *                       description: Sessions ID
 *                     registrationDate:
 *                       type: string
 *                       format : date
 *                       description: Completion Date
 *                     trainingDate:
 *                       type: string
 *                       format : date
 *                       description: Employee Roles
 *                     completionDate:
 *                       type: string
 *                       format : date
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
 *                   example: "Don't have promision"
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
enrollment.get(
  "/showEnrollment",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

    if (!contentType || contentType != "application/json") {
      const missingHeaders: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
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
          const enrollment = await enrollments.find({});
          const currentEnrollments: responseData = {
            code: "200",
            status: "Employee data retrieved successfully",
            data: enrollment,
          };
          res.status(200).json(currentEnrollments);
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
/**
 * @swagger
 * /enrollment/approved:
 *   post:
 *     summary: Enrollment Approval
 *     tags:
 *       - HR Enrollment
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
 *                       description: Employee Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Name of a course
 *                     sessionsId:
 *                       type: string
 *                       description: Sessions ID
 *                     registrationDate:
 *                       type: string
 *                       format : date
 *                       description: Completion Date
 *                     trainingDate:
 *                       type: string
 *                       format : date
 *                       description: Employee Roles
 *                     completionDate:
 *                       type: string
 *                       format : date
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
 *                   example: "Don't have promision"
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
 *                   example: "The provided '${empId}' empId does not match any enrollment record in the database"
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
enrollment.post(
  "/approved",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    const { empId, courseId, sessionId }: any = req.body;

    if (!contentType || contentType !== "application/json") {
      const missingHeaders: responseError = {
        code: "400",
        status: "Failed",
        message:
          "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
      };
      res.status(400).json(missingHeaders);
    } else {
      if (decoded.roles !== "Hr") {
        const promis: responseError = {
          code: "403",
          status: "Failed",
          message: "Don't have permission",
        };
        res.status(403).json(promis);
      } else {
        try {
          if (!empId || !courseId || !sessionId) {
            const incompleteData: responseError = {
              code: "400",
              status: "Failed",
              message:
                "Incomplete data provided. Please ensure all required fields are filled in",
            };
            res.status(400).json(incompleteData);
          } else {
            const checkEnrollment = await enrollments.findOne({
              empId,
              courseId,
              sessionId,
            });

            if (!checkEnrollment) {
              const notFound: responseError = {
                code: "404",
                status: "Failed",
                message: `No enrollment found for empId '${empId}', courseId '${courseId}', and sessionId '${sessionId}'`,
              };
              res.status(404).json(notFound);
            } else if (checkEnrollment.status !== "pending") {
              const notAllowed: responseError = {
                code: "403",
                status: "Failed",
                message: `Cannot approve enrollment. Only 'pending' status can be approved.`,
              };
              res.status(403).json(notAllowed);
            } else {
              const updateStatus = await enrollments.updateOne(
                { empId, courseId, sessionId },
                {
                  $set: {
                    status: "approved",
                  },
                }
              );

              const currentEnrollments: responseData = {
                code: "200",
                status: "Employee data retrieved successfully",
                data: updateStatus,
              };

              res.status(200).json(currentEnrollments);
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
);

/**
 * @swagger
 * /enrollment/denied:
 *   post:
 *     summary: Checkdata Update CourseResult
 *     tags:
 *       - HR Enrollment
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
 *                 description: EmpID to retrieve data for
 *                 example: EMP001
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
 *                       description: Employee Department
 *                     courseId:
 *                       type: string
 *                       description: Course ID
 *                     courseName:
 *                       type: string
 *                       description: Name of a course
 *                     sessionsId:
 *                       type: string
 *                       description: Sessions ID
 *                     registrationDate:
 *                       type: string
 *                       format : date
 *                       description: Completion Date
 *                     trainingDate:
 *                       type: string
 *                       format : date
 *                       description: Employee Roles
 *                     completionDate:
 *                       type: string
 *                       format : date
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
 *                   example: "Don't have promision"
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
enrollment.post("/denied", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
  const { empId, courseId, sessionId }: any = req.body;

  if (!contentType || contentType != "application/json") {
    const missingHeaders: responseError = {
      code: "400",
      status: "Failed",
      message:
        "Bad Request: Missing required headers - 'Content-Type' and 'token-key' are needed for endpoint /checkEmp",
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
        const checkEnrollment = await enrollments.findOne({ empId: empId });
        if (!checkEnrollment) {
          const missingId: responseError = {
            code: "404",
            status: "Failed",
            message: `The provided '${empId}' empId does not match any enrollment record in the database.`,
          };
          res.status(404).json(missingId);
        } else if (checkEnrollment.status !== "pending") {
          const notAllowed: responseError = {
            code: "403",
            status: "Failed",
            message: `Cannot denied enrollment. Only 'pending' status can be approved.`,
          };
          res.status(403).json(notAllowed);
        } else {
          if (!empId || !courseId || !sessionId) {
            const incompleteData: responseError = {
              code: "400",
              status: "Failed",
              message:
                "Incomplete data provided. Please ensure all required fields are filled in",
            };
            res.status(404).json(incompleteData);
          } else {
            if (checkEnrollment.courseId !== courseId) {
              const missingCourseId: responseError = {
                code: "404",
                status: "Failed",
                message: `with Id '${courseId}' courseId  not found checkEnrollment`,
              };
              res.status(404).json(missingCourseId);
            } else {
              if (checkEnrollment.sessionId !== sessionId) {
                const missingSessionId: responseError = {
                  code: "404",
                  status: "Failed",
                  message: `with Id '${sessionId}' sessionId not found checkEnrollment`,
                };
                res.status(404).json(missingSessionId);
              } else {
                const updateStatus = await enrollments.updateOne(
                  { empId: empId, courseId: courseId, sessionId: sessionId },
                  {
                    $set: {
                      status: "denied",
                    },
                  }
                );
                const currentEnrollments: responseData = {
                  code: "200",
                  status: "Employee data retrieved successfully",
                  data: updateStatus,
                };
                res.status(200).json(currentEnrollments);
              }
            }
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
