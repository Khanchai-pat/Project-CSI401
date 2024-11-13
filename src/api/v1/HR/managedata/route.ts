import express, { Request, Response } from 'express'
import { responseData, responseError } from '../model/model'

export const manageData = express();

//create-Emp
manageData.post("/createEmp", (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const {bodys}: any = req.body

    const { empID,
        empName,
        departMent,
        cardID,
        email,
        tel,
        role,
        empStatus
    } = req.body

    if (contentType && tokenkey) {
        const succsessData: responseData = {
            code: "success-001-0010",
            status: 'OK createEmp : id',
            data: {
                empID: empID,
                empName: empName,
                departMent: departMent,
                cardID: cardID,
                email: email || '',
                tel: tel || '',
                role: role,
                empStatus: empStatus
            }
        }
        res.status(200).json(succsessData)

    } else {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token"
        }
        res.status(400).send(errData)
    }
})


//edit-Emp
manageData.post("/editEmp", (req: Request, res: Response) => {

    // res headers
    const reqHeader: any = req.headers
    //                                   key in postman
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    console.log(contentType)
    console.log(tokenkey)

    // res body
    const {
        empID,
        empName,
        departMent,
        cardID,
        email,
        tel, role,
        empStatus,

        firstTrainingDate,
        trainingDate,
        courseID,
        courseName,
        trainingLocation,
        trainingHours,
        nextExpiryDate
    } = req.body

    if (contentType && tokenkey) {
        const cerrentData = {
            empID: empID,
            empName: empName,
            departMent: departMent,
            cardID: cardID,
            email: email,
            tel: tel,
            role: role,
            empStatus: empStatus,
            firstTrainingDate: firstTrainingDate,
            trainingDate: trainingDate,
            courseID: courseID,
            courseName: courseName,
            trainingLocation: trainingLocation,
            trainingHours: trainingHours,
            nextExpiryDate: nextExpiryDate
        }
        const updateData = {
            email: email || cerrentData.email,
            tel: tel,
            role: role

        }
        const succsessData: responseData = {
            code: "success-001-0010",
            status: 'OK editEmp',
            data: updateData
        }
        res.status(200).json(succsessData)

    } else {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token"
        }
        res.status(400).send(errData)
    }
})

//delete-Emp
manageData.post("/deleteEmp", (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    //                                 key in postman
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    console.log(contentType)
    console.log(tokenkey)

    // res body
    const {
        empID,
        empName,
        departMent,
        cardID,
        email,
        tel,
        role,
        empStatus
    } = req.body

    console.log(empID)

    if (contentType && tokenkey) {
        if (empID) {
            const succsessData: responseData = {
                code: "delete-001-0010",
                status: 'OK deleteEmp',
                data: {
                    empID: empID,
                    empStatus: empStatus
                }
            }
            res.status(200).json(succsessData)
        } else {
            res.status(400).send({
                message: "empID is required to update employee status End-Point deleteEmp"
            });
        }
    } else {
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point deleteEmp"
        }
        res.status(400).send(errData)
    }
})