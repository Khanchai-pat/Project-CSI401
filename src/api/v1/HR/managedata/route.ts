import express, { Request, Response } from 'express'
import { responseData, responseError } from '../model/model';
import mongoose from 'mongoose';
export const manageData = express();

const empSchema = new mongoose.Schema({
    empId: String,
    empName: String,
    departMent: String,
    cardId: String,
    email: String,
    tel: String,
    role: String,
    empStatus: String
})

const employees = mongoose.model('emp', empSchema)

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

    const newData: any = {
        empId,
        empName,
        departMent,
        cardId,
        email,
        tel,
        role,
        empStatus
    }
    console.log(newData)
    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: `Missing requried header: contentType and tokenkey managedata`
        }
        res.status(400).send(verifyError)

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
            const errorClient: responseError = {
                message: `ส่งข้อมูลไม่ครบถ้วน`
            }
            res.status(400).send(errorClient)
        } else {
            const cerrentData = await employees.findOne({
                $or: [
                    { empId: empId },
                    { cardId: cardId },
                    { email: email },
                    { tel: tel }
                ]
            })
            console.log(`data in Database ${cerrentData}`)
            if (newData !== cerrentData) {
                try {
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
                } catch {
                    const errorServer: responseError = {
                        message: `server error method manageData createEmp`
                    }
                    res.status(500).send(errorServer)
                }
            } else {
                const errorClient: responseError = {
                    message: `ข้อมูลซ้ำกัน`
                }
                res.status(400).send(errorClient)
            }
        }
    }
})


//edit-Emp
manageData.post("/editEmp", async (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    //                                   key in postman
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    // res body
    const {
        empId,
        empName,
        departMent,
        cardID,
        email,
        tel,
        role,
        empStatus,

        firstTrainingDate,
        trainingDate,
        courseID,
        courseName,
        trainingLocation,
        trainingHours,
        nextExpiryDate
    } = req.body

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: "Missing required headers: content-type and authorization token Route:mangedata Methode:ditEmp"
        }
        res.status(400).json(verifyError)
    } else {
        if (!empId && !empStatus) {
            const verifyError: responseError = {
                message: "Id Status cannot be found Route:mangedata Methode:ditEmp"
            }
            res.status(400).json(verifyError)
        } else {
            try {
                const cerrentDataEmp = await employees.find({ empId: empId })
                const updateFields = {
                    ...(empName && { empName }),
                    ...(cardID && { cardID }),
                    ...(email && { email }),
                    ...(tel && { tel }),
                    ...(role && { role }),
                    ...(empStatus && { empStatus }),
                    ...(firstTrainingDate && { firstTrainingDate }),
                    ...(trainingDate && { trainingDate }),
                    ...(courseID && { courseID }),
                    ...(courseName && { courseName }),
                    ...(trainingLocation && { trainingLocation }),
                    ...(trainingHours && { trainingHours }),
                    ...(nextExpiryDate && { nextExpiryDate })
                };
                const newUpdate = { ...cerrentDataEmp, ...updateFields }
            } catch (error) {
                console.log(error)
                const serverError: responseError = {
                    message: "server error Route:mangedata Methode:ditEmp"
                }
                res.status(400).json(serverError)
            }
            const successData: responseError = {
                message: "Missing required headers: content-type and authorization token"
            }
            res.status(400).json(successData)
        }
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