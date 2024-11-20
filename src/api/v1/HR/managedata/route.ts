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
            try {
                const cerrentData = await employees.findOne({
                    $or: [
                        { empId: empId },
                        { cardId: cardId },
                        { email: email },
                        { tel: tel }
                    ]
                })
                console.log(cerrentData)
                console.log(`data in Database ${cerrentData}`)
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
                    const errorClient: responseError = {
                        message: `ข้อมูลซ้ำกัน`
                    }
                    res.status(400).send(errorClient)
                }
            } catch (error) {
                console.log(error)
                const errorServer: responseError = {
                    message: `server error method manageData createEmp`
                }
                res.status(500).send(errorServer)
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
        empStatus,

        firstTrainingDate,
        trainingDate,
        courseID,
        courseName,
        trainingLocation,
        trainingHours,
        nextExpiryDate
    }: any = req.body

    console.log(req.body)

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            message: "Missing required headers: content-type and authorization token Route:mangedata Methode:ditEmp"
        }
        res.status(400).json(verifyError)
    } else {
        if (!empId || empStatus !== 'Active') {
            const reqError: responseError = {
                message: "No empId and  Status != Active : cannot be found Route:mangedata Methode:ditEmp"
            }
            res.status(400).json(reqError)
        } else {

            const checkData = await employees.findOne({ empId: empId });
            if (!checkData) {
                const errorClient: responseError = {
                    message: "ไม่พบ empId ที่ต้องการ Route:mangedata Methode:editEmp"
                };
                res.status(404).json(errorClient)
            } else {
                try {
                    const updateData = await employees.updateOne({ empId: empId }, req.body)
                    console.log(` this is update data = ${updateData}`)
                    const dbEditData: responseData = {
                        code: '200',
                        status: 'OK',
                        data: {
                            updateData
                        }
                    }
                    res.status(200).json(dbEditData)
                } catch (error) {
                    console.log(error)
                    const serverError: responseError = {
                        message: "server error Route:mangedata Methode:ditEmp"
                    }
                    res.status(400).json(serverError)
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
        const verifyError: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point deleteEmp"
        }
        res.status(400).send(verifyError)
    } else {
        if (!empId) {
            const reqError: responseError = {
                message: "No empId and  Status != Active : cannot be found Route:mangedata Methode:ditEmp"
            }
            res.status(404).json(reqError)
        } else {
            const checkDataEmp = await employees.findOne({ empId: empId })
            if (!checkDataEmp) {
                const errorClient: responseError = {
                    message: "ไม่พบ empId ที่ต้องการ Route:mangedata Methode:deleteEmp"
                };
                res.status(404).json(errorClient)
            } else {
                try {
                    const updateData = await employees
                        .updateOne({ empId: empId },
                            {
                                $set: {
                                    empStatus: empStatus
                                }
                            })

                    const dbDeleteEmp: responseData = {
                        code: '200',
                        status: 'OK',
                        data: {
                            updateData
                        }
                    }
                    res.status(200).json(dbDeleteEmp)
                } catch (error) {
                    console.log(error)
                    const serverError: responseError = {
                        message: "server error Route:mangedata Methode:ditEmp"
                    }
                    res.status(400).json(serverError)
                }
            }
        }
    }
})