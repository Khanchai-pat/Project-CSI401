import express, { Request, Response } from 'express'
import { responseData, responseError } from '../../interfaceRes/response'
import { employees } from "../Schema/emp"
export const manageData = express();

//create-Emp
manageData.post("/createEmp", async (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    const {
        empId,
        empName,
        departMent,
        cardId,
        email,
        tel,
        role,
        empStatus
    }: any = req.body

    if (contentType !== 'application/json' || !tokenkey) {
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
            !tel ||
            !role ||
            !empStatus
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
                        { tel: tel }
                    ]
                })
                if (!cerrentData) {
                    const addEmp = await employees.create({
                        empId: empId,
                        empName: empName,
                        departMent: departMent,
                        cardId: cardId,
                        email: email,
                        tel: tel,
                        role: role,
                        empStatus: empStatus
                    })
                    const successData: responseData = {
                        code: "200",
                        status: "OK",
                        data: addEmp
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
manageData.post("/editEmp", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    const {
        id,
        empId,
        empName,
        departMent,
        cardID,
        email,
        tel,
        role,
        empStatus

        // firstTrainingDate,
        // trainingDate,
        // courseID,
        // courseName,
        // trainingLocation,
        // trainingHours,
        // nextExpiryDate

    }: any = req.body

    console.log(req.body)

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!empId || empStatus !== 'Active') {
            const reqError: responseError = {
                code: "400",
                status: "Failed",
                message: "Employee ID is required and the employee status must be 'Active'. Route: manageData, Method: editEmp"
            };
            res.status(400).json(reqError);
        } else {
            const checkData = await employees.findOne({ empId: empId });
            if (!checkData) {
                const employeeNotFoundError: responseError = {
                    code: "404",
                    status: "Failed",
                    message: `Employee ID${empId} not found Route: manageData, Method: editEmp`
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
manageData.post("/deleteEmp", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]

    const {
        empId,
        empStatus
    } = req.body

    if (!contentType || !tokenkey) {
        const missingHeadersError: responseError = {
            code: "400",
            status: "Failed",
            message: "Missing required headers: content-type and authorization token"
        };
        res.status(400).json(missingHeadersError);
    } else {
        if (!empId) {
            const missingEmpIdError: responseError = {
                code: "400",
                status: "Failed",
                message: "Employee ID is required to delete. Route: manageData, Method: deleteEmp"
            };
            res.status(400).json(missingEmpIdError)
        } else {
            const checkDataEmp = await employees.findOne({ empId: empId })
            if (!checkDataEmp) {
                const empIdNotFoundError: responseError = {
                    code: "400",
                    status: "Failed",
                    message: `Employee ID ${empId} not found for deletion. Route: manageData, Method: deleteEmp`
                };
                res.status(400).json(empIdNotFoundError);
            } else {
                try {
                    const updateData = await employees
                        .updateOne({ empId: empId },
                            {
                                $set: {
                                    empStatus: empStatus
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