import express, { Request, Response } from 'express'
import { responseData, responseError } from '../Model/model'
export const checkData = express();

// interface responseData {
//     code: number,
//     message: string,
//     data: object
// }

// interface responseError {
//     mesage: string
// }

//Check Data EMP
checkData.get("/checkEmp", async     (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')
        const reqCheckData: responseData = {
            code: "200",
            status: "success",
            data: [{
                "EmpID": "Emp001",
                "EmpName": "John Doe",
                "department": "Sales",
                "email": "johndoe@example.com",
                "tel": 123445112,
                "EmpStatus": "Active",
                "role": "Accoutting"
            },
            {
                "EmpID": "Emp002",
                "EmpName": "John Doe",
                "department": "Sales",
                "email": "johndoe@example.com",
                "tel": 123445112,
                "EmpStatus": "Active",
                "role": "Accoutting"
            },
            {
                "EmpID": "Emp003",
                "EmpName": "John Doe",
                "department": "Sales",
                "email": "johndoe@example.com",
                "tel": 123445112,
                "EmpStatus": "Active",
                "role": "Accoutting"
            }
            ]
        }
        res.status(200).send(reqCheckData)
    } else {
        console.log('this is else')
        res.status(500).send({
            message: "Missing required headers: content-type and authorization token End-Point checkEmp"
        })
    }
})


//Check Data byEmp
checkData.get("/checkEmpID", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')
        const reqCheckEmpID: responseData = {
            code: "200",
            status: "success",
            data: {
                "EmpID": "Emp001",
                "EmpName": "John Doe",
                "department": "Sales",
                "cardID": "1-0000-00000-00-0",
                "email": "johndoe@example.com",
                "tel": 123445112,
                "firstTrainingDate": "2023-09-30",
                "courseDetails": [
                    {
                        "courseID": "ABC100",
                        "trainingDate": "2024-03-20",
                        "courseName": "เตรียมความพร้อมสู่การทำงาน",
                        "trainingLocation": "5-505",
                        "trainingHours": 8
                    }
                ],
                "expiryDate": "2025-09-30",
                "trainingDuration": "00-00-01",
                "nextExpiryDate": "00-11-30",
                "EmpStatus": "Active"
            }
        }
        res.status(200).send(reqCheckEmpID)
    }
    else {
        console.log('this is else')
        res.status(400).send({
            message: "Missing required headers: content-type and authorization token End-Point checkEmpID"
        })
    }
})