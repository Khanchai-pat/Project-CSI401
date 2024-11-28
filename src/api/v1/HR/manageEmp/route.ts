import express, { Request, Response } from 'express'
import { responseData, responseError } from '../../interfaceRes/response'
import bcrypt from 'bcryptjs'
import { employees } from "../../Schema/emp"
import { users } from "../../Schema/users"
import { verifyToken } from '../../middleware/route'

export const manageData = express();

//create-Emp
manageData.post("/createEmp", verifyToken, async (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    // const tokenkey: any = reqHeader["token-key"]

    const {
        empId,
        empName,
        departMent,
        cardId,
        email,
        tel,
        role,
        status
    }: any = req.body

    if (!contentType || contentType != "application/json") {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);

    } else {
        if (!empId ||
            !empName ||
            !departMent ||
            !cardId ||
            !email ||
            !tel
            // !role ||
            // !status
        ) {
            const incompleteDataError: responseError = {
                code: "400",
                status: "Failed",
                message: "Incomplete data provided. Please ensure all required fields are filled in"
            };
            res.status(400).json(incompleteDataError);
        } else {
            try {
                const cerrentData = await employees.findOne({
                    $or: [
                        { empId: empId },
                        { cardId: cardId },
                        { email: email },
                    ]
                })
                if (!cerrentData) {
                    const addEmp = await employees.insertMany({
                        empId: empId,
                        empName: empName,
                        departMent: departMent,
                        cardId: cardId,
                        email: email,
                        tel: tel,
                        role: role || "EMP",
                        status: status || "active"
                    })

                    const salt = await bcrypt.genSalt(10)
                    const passwords = await bcrypt.hash(cardId, salt)
                    console.log(passwords)

                    const addUser = await users.insertMany({
                        username: email,
                        password: passwords,
                        role: role || "EMP",
                        status: status
                    })
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: {
                            addEmp,
                            addUser
                        }
                    }
                    res.status(200).json(successData)
                } else {
                    const duplicateDataError: responseError = {
                        code: "400",
                        status: "Failed",
                        message: "Duplicate data found. The provided employee information already exists in the system"
                    };
                    res.status(400).json(duplicateDataError);
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
}
)

//edit-Emp
manageData.post("/editEmp", verifyToken, async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    // const tokenkey: any = reqHeader["token-key"]

    const {
        empId,
        empName,
        departMent,
        cardId,
        email,
        tel,
        role,
        status

        // firstTrainingDate,
        // trainingDate,
        // courseId,
        // courseName,
        // trainingLocation,
        // trainingHours,
        // nextExpiryDate

    }: any = req.body

    console.log(req.body)

    if (!contentType || contentType != "application/json") {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!empId || status !== 'active') {
            const reqError: responseError = {
                code: "400",
                status: "Failed",
                message: "Employee Id is required and the employee status must be 'Active' Route: manageData, Method: editEmp"
            };
            res.status(400).json(reqError);
        } else {
            const checkData = await employees.findOne({ empId: empId });
            if (!checkData) {
                const employeeNotFoundError: responseError = {
                    code: "404",
                    status: "Failed",
                    message: `Employee Id '${empId}' not found Route: manageData, Method: editEmp`
                };
                res.status(404).json(employeeNotFoundError);
            } else {
                try {
                    const updateData = await employees.updateOne({ empId: empId }, req.body)
                    const updateEmployeeResponse: responseData = {
                        code: '200',
                        status: 'OK',
                        data: updateData
                    };
                    res.status(200).json(updateEmployeeResponse);
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
    }
})

//delete-Emp
manageData.post("/removeEmp", verifyToken, async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    // const tokenkey: any = reqHeader["token-key"]

    const {
        empId,
        status
    } = req.body

    if (!contentType || contentType != "application/json") {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!empId || status !== 'active') {
            const missingempIdError: responseError = {
                code: "400",
                status: "Failed",
                message: "Employee Id is required to delete. Route: manageData, Method: deleteEmp"
            };
            res.status(400).json(missingempIdError)
        } else {
            const checkDataEmp = await employees.findOne({ empId: empId })
            if (!checkDataEmp) {
                const empIdNotFoundError: responseError = {
                    code: "400",
                    status: "Failed",
                    message: `Employee Id  '${empId}' not found for deletion. Route: manageData, Method: removeEmp`
                };
                res.status(400).json(empIdNotFoundError);
            } else {
                try {
                    const updateData = await employees
                        .updateOne({ empId: empId },
                            {
                                $set: {
                                    // status: "Inactive"
                                    status: "Inactive"
                                }
                            })

                    const empDeletionSuccessData: responseData = {
                        code: '200',
                        status: 'OK',
                        data: {
                            updateData
                        }
                    };
                    res.status(200).json(empDeletionSuccessData);
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
    }
})