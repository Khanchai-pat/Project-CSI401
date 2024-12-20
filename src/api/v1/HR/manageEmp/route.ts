import express, { Request, Response } from "express";
import { responseData, responseError } from "../../interfaceRes/response";
import bcrypt from "bcryptjs";
import { employees } from "../../Schema/emp";
import { users } from "../../Schema/users";
import { verifyToken } from "../../middleware/route";
import { SECRET_KEY } from "../../middleware/route";
import jwt from "jsonwebtoken";
export const manageEmp = express();

//create-Emp
manageEmp.post(
  "/createEmp",
  verifyToken,
  async (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);
    console.log(decoded);
    const { empName, department, cardId, email, tel, roles, status }: any =
      req.body;

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
          message: "Don't have permission",
        };
        res.status(400).json(promis);
      } else {
        if (!cardId || !email) {
          const incompleteDataError: responseError = {
            code: "400",
            status: "Failed",
            message:
              "Incomplete data provided. Please ensure all required fields are filled in",
          };
          res.status(400).json(incompleteDataError);
        } else {
          const empLenght = await employees.countDocuments({});
          const empId = "EMP" + (empLenght + 1).toString().padStart(3, "0");
          try {
            const currentData = await employees.findOne({
              $or: [{ empId: empId }, { cardId: cardId }, { email: email }],
            });
            if (!currentData) {
              const addEmp = await employees.create({
                empId: empId,
                empName: empName,
                department: department,
                cardId: cardId,
                email: email,
                tel: tel,
                roles: roles || "Emp",
                status: status || "active",
              });

              const salt = await bcrypt.genSalt(10);
              const passwords = await bcrypt.hash(cardId, salt);
              console.log(passwords);

              const addUser = await users.create({
                username: email,
                password: passwords,
                empId: empId,
                roles: roles || "Emp",
                status: status || "avtive",
              });
              const successData: responseData = {
                code: "200",
                status: "OK",
                data: {
                  addEmp,
                  addUser,
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

//edit-Emp
manageEmp.post("/editEmp", verifyToken, async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const tokenkey: any = reqHeader["authorization"];
  const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

  const {
    empId,
    empName,
    departMent,
    cardId,
    email,
    tel,
    role,
    status,
  }: // firstTrainingDate,
  // trainingDate,
  // courseId,
  // courseName,
  // trainingLocation,
  // trainingHours,
  // nextExpiryDate

  any = req.body;

  console.log(req.body);

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
        message: "Don't have permission",
      };
      res.status(400).json(promis);
    } else {
      if (!empId) {
        const reqError: responseError = {
          code: "400",
          status: "Failed",
          message:
            "Employee Id is required and the employee status must be 'Active' Route: manageEmp, Method: editEmp",
        };
        res.status(400).json(reqError);
      } else {
        const checkData = await employees.findOne({ empId: empId });
        if (!checkData) {
          const employeeNotFoundError: responseError = {
            code: "404",
            status: "Failed",
            message: `Employee Id '${empId}' not found Route: manageEmp, Method: editEmp`,
          };
          res.status(404).json(employeeNotFoundError);
        } else {
          try {
            const updateData = await employees.updateOne(
              { empId: empId },
              req.body
            );
            const updateEmployeeResponse: responseData = {
              code: "200",
              status: "OK",
              data: updateData,
            };
            res.status(200).json(updateEmployeeResponse);
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
});

//delete-Emp
manageEmp.post(
  "/removeEmp",
  verifyToken,
  async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: any = reqHeader["content-type"];
    const tokenkey: any = reqHeader["authorization"];
    const decoded: any = jwt.verify(tokenkey, SECRET_KEY);

    const { empId, status } = req.body;

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
          message: "Don't have permission",
        };
        res.status(400).json(promis);
      } else {
        if (!empId || status !== "active") {
          const missingempIdError: responseError = {
            code: "400",
            status: "Failed",
            message:
              "Employee Id is required to delete. Route: manageEmp, Method: deleteEmp",
          };
          res.status(400).json(missingempIdError);
        } else {
          const checkDataEmp = await employees.findOne({ empId: empId });
          if (!checkDataEmp) {
            const empIdNotFoundError: responseError = {
              code: "400",
              status: "Failed",
              message: `Employee Id  '${empId}' not found for deletion. Route: manageEmp, Method: removeEmp`,
            };
            res.status(400).json(empIdNotFoundError);
          } else {
            try {
              const updateData = await employees.updateOne(
                { empId: empId },
                {
                  $set: {
                    // status: "Inactive"
                    status: "inactive",
                  },
                }
              );

              await users.updateOne(
                { empId: empId, status: "active" },
                {
                  $set: {
                    status: "inactive",
                  },
                }
              );

              const empDeletionSuccessData: responseData = {
                code: "200",
                status: "OK",
                data: {
                  updateData,
                },
              };
              res.status(200).json(empDeletionSuccessData);
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
  }
);
