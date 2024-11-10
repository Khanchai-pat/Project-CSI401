import express, { Request, Response } from 'express'
import { responseData, responseError } from '../model/model';
export const course = express();


//Show list requests 
// course.get("/requests", (req: Request, res: Response) => {
//     const reqHeader: any = req.headers
//     //                                         key in postman
//     const contentType: any = reqHeader["content-type"]
//     //                                         key in postman
//     const tokenkey: any = reqHeader["authorization"]

//     if (tokenkey && contentType) {
//         console.log('this is if')
//         const reqCourse: responseData = {
//             code: "200",
//             status: "OK",
//             data: [
//                 {
//                     reqId: "req001",
//                     EmpID: "Emp001",
//                     EmpName: "John Doe",
//                     department: "Sales",
//                     email: "Somchaitest@example.com",
//                     tel: "090-0000-000",
//                     courseID: "ABC101",
//                     courseName: "เตรียมความพร้อมสู่การทำงานเป็นทีม",
//                     statusPending: "Pending"
//                 },
//                 {
//                     reqId: "req001",
//                     EmpID: "Emp001",
//                     EmpName: "John Doe",
//                     department: "Sales",
//                     email: "Somchaitest@example.com",
//                     tel: "090-0000-000",
//                     courseID: "ABC101",
//                     courseName: "เตรียมความพร้อมสู่การทำงานเป็นทีม",
//                     statusPending: "Pending"
//                 },
//                 {
//                     reqId: "req001",
//                     EmpID: "Emp001",
//                     EmpName: "John Doe",
//                     department: "Sales",
//                     email: "Somchaitest@example.com",
//                     tel: "090-0000-000",
//                     courseID: "ABC101",
//                     courseName: "เตรียมความพร้อมสู่การทำงานเป็นทีม",
//                     statusPending: "Pending"
//                 }
//             ]
//         }
//         res.status(200).json(reqCourse)
//     } else {
//         console.log('this is else')
//         const errData: responseError = {
//             message: "Missing required headers: content-type and authorization token End-Point requests"
//         }
//         res.status(500).send(errData)
//     }
// })
course.get("/requests", async    (req: Request, res: Response) => {

    try {
        const reqHeader: any = req.headers;
        const contentType: string = reqHeader["content-type"];
        const tokenkey: string = reqHeader["authorization"];

        // ตรวจสอบ headers ที่ต้องการ
        if (!tokenkey || !contentType) {
            const errData: responseError = {
                message: "Missing required headers: content-type and authorization token End-Point /requests"
            };
            res.status(400).json(errData);
        }

        // เมื่อ headers ถูกต้อง จะสร้างข้อมูลตัวอย่าง response
        const reqCourse: responseData = {
            code: "200",
            status: "OK",
            data: [
                {
                    reqId: "req001",
                    EmpID: "Emp001",
                    EmpName: "John Doe",
                    department: "Sales",
                    email: "Somchaitest@example.com",
                    tel: "090-0000-000",
                    courseID: "ABC101",
                    courseName: "เตรียมความพร้อมสู่การทำงานเป็นทีม",
                    statusPending: "Pending"
                },
                {
                    reqId: "req002",
                    EmpID: "Emp002",
                    EmpName: "Jane Smith",
                    department: "Marketing",
                    email: "janesmith@example.com",
                    tel: "090-1111-111",
                    courseID: "ABC102",
                    courseName: "พัฒนาทักษะการสื่อสาร",
                    statusPending: "Pending"
                }
            ]
        };

        // ส่ง response กลับไปที่ client
        res.status(200).json(reqCourse);
    } catch (error) {
        console.error("Error handling /requests endpoint:", error);
        const errData: responseError = {
            message: "Internal server error at /requests endpoint."
        };
        res.status(500).json(errData);
    }
});


////Show list requests By ID
course.get("/requests/:id", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')
        const reqCourse: responseData = {
            code: "200",
            status: "OK /requests/:id",
            data: [
                {
                    reqId: req.params.id,
                    empID: "Emp001",
                    EmpName: "John Doe",
                    department: "Sales",
                    email: "Somchaitest@example.com",
                    tel: "090-0000-000",
                    courseID: "ABC101",
                    courseName: "เตรียมความพร้อมสู่การทำงานเป็นทีม",
                    statusPending: "Pending"
                },
            ]
        }
        res.status(200).json(reqCourse)
    } else {
        console.log('this is else')
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /requests/:id"
        }
        res.status(500).send(errData)
    }
})

//Show list request ByID appove
course.post("/appove", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')

        const reqCourse: responseData = {
            code: "200",
            status: "OK appove",
            data: [
                {
                    req001: "req001",
                    empId: "Emp001",
                    status: "Approve",
                    approvalDate: "2024-10-18"

                },
            ]
        }
        res.status(200).json(reqCourse)
    } else {
        console.log('this is else')
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /appove course"
        }
        res.status(500).send(errData)
    }
})

// Show list request ByID reject
course.post("/reject", (req: Request, res: Response) => {
    const reqHeader: any = req.headers
    //                                         key in postman
    const contentType: any = reqHeader["content-type"]
    //                                         key in postman
    const tokenkey: any = reqHeader["authorization"]

    if (tokenkey && contentType) {
        console.log('this is if')

        const reqCourse: responseData = {
            code: "200",
            status: "OK reject",
            data: [
                {
                    status: "Reject",
                    remark: "ลงทะเบียนเยอะเกินไป",
                    approvalDate: "2024-10-18"
                },
            ]
        }
        res.status(200).json(reqCourse)
    } else {
        console.log('this is else')
        const errData: responseError = {
            message: "Missing required headers: content-type and authorization token End-Point /reject course"
        }
        res.status(500).send(errData)
    }
})



//1.2.14 API : HR - Show Courses Results
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.15 API : HR - Show Courses Results ByID
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

//1.2.16 API : HR - Show Courses Results ByID Update
course.post("/signout", (req: Request, res: Response) => {
    res.send({
        date: "signout",
        method: "post"
    })
})

