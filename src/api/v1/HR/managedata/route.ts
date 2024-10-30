import express, { Request, Response } from 'express'

export const manageData = express();

interface responseData {
    code: string,
    status: string,
    data: object
}

interface responseError {
    mesage: string
}

//create-Emp
manageData.post("/createEmp", (req: Request, res: Response) => {
    // res headers
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    // res body
    const bodys: any = req.body
    const empID: any = bodys.empID
    const empName: any = bodys.empName
    const departMent: any = bodys.departMent
    const cardID: number = bodys.cardID
    const email: string = bodys.email
    const tel: number = bodys.tel
    const role: string = bodys.role
    const empStatus: string = bodys.empStatus

    if (contentType && tokenkey) {
        const succsessData: responseData = {
            code: "success-001-0010",
            status: 'OK',
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
            mesage: "Missing required headers: content-type and authorization token"
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
    const bodys: any = req.body
    const empID: any = bodys.empID
    const empName: any = bodys.empName
    const departMent: any = bodys.departMent
    const cardID: number = bodys.cardID
    const email: string = bodys.email
    const tel: number = bodys.tel
    const role: string = bodys.role
    const empStatus: string = bodys.empStatus

    const firstTrainingDate: any = bodys.firstTrainingDate
    const trainingDate: any = bodys.trainingDate
    const courseID: string = bodys.courseID
    const courseName: string = bodys.courseName
    const trainingLocation: string = bodys.trainingLocation
    const trainingHours: number = bodys.trainingHours
    const nextExpiryDate: string = bodys.nextExpiryDate

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
            status: 'OK',
            data: updateData
        }
        res.status(200).json(succsessData)

    } else {
        const errData: responseError = {
            mesage: "Missing required headers: content-type and authorization token"
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
    const bodys: any = req.body
    const empID: any = bodys.empID
    const empName: any = bodys.empName
    const departMent: any = bodys.departMent
    const cardID: number = bodys.cardID
    const email: string = bodys.email
    const tel: number = bodys.tel
    const role: string = bodys.role
    const empStatus: string = bodys.empStatus
    console.log(empID)

    if (contentType && tokenkey) {
        if (empID) {
            const succsessData: responseData = {
                code: "delete-001-0010",
                status: 'OK',
                data: {
                    empID: empID,
                    empStatus: empStatus
                }
            }
            res.status(200).json(succsessData)
        } else {
            res.status(400).json({
                message: "empID is required to update employee status End-Point deleteEmp"
            });
        }
    } else {
        const errData: responseError = {
            mesage: "Missing required headers: content-type and authorization token End-Point deleteEmp"
        }
        res.status(400).json(errData)
    }
})