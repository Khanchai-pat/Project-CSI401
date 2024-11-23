
import express, { Request, Response } from 'express'
import { responseData, responseError } from '../../interfaceRes/response'
import Course from "../Schema/Course";
import Registration from "../Schema/Registration";
import { coursesResults } from '../Schema/courseresult';
export const Courses = express();




const verifyToken = (token: string | undefined): boolean => {
    const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    return token === validToken;
};


// Courses.post("/register", async (req: Request, res: Response) => {
//     const token = req.headers["token-key"] as string;

//     if (!verifyToken(token)) {
//          res.status(401).json({
//             code: "401",
//             status: "error",
//             message: "Unauthorized",
//         });
//     }

//     const { employeeId, courseId } = req.body;

//     try {
//         // ตรวจสอบว่าหลักสูตรมีอยู่จริงหรือไม่
//         const course = await Course.findOne({ courseID: courseId });
//         if (!course) {
//              res.status(404).json({
//                 code: "404",
//                 status: "error",
//                 message: "Course not found",
//             });
//         }

//         // ตรวจสอบว่าจำนวนที่นั่งเหลือเพียงพอหรือไม่
//         if (course <= 0) {
//             res.status(400).json({
//                 code: "400",
//                 status: "error",
//                 message: "Course is fully booked",
//             });
//         }

//         // ตรวจสอบว่าพนักงานสมัครในช่วงเวลาเดียวกันหรือไม่
//         const overlappingRegistration = await Registration.findOne({
//             employeeId,
//             periods: course.periods,
//         });

//         if (overlappingRegistration) {
//              res.status(400).json({
//                 code: "400",
//                 status: "error",
//                 message: "Cannot register for overlapping periods",
//             });
//         }

//         // บันทึกการสมัคร
//         const newRegistration = new Registration({
//             employeeId,
//             courseId: course.courseID,
//             courseName: course.courseName,
//             periods: course.periods,
//         });

//         await newRegistration.save();

//         // อัปเดตจำนวนที่นั่งที่เหลือของคอร์ส
//         course.courseLeft -= 1;
//         await course.save();

//         res.status(200).json({
//             code: "200",
//             status: "success",
//             message: "Registration successful",
//             data: newRegistration,
//         });
//     } catch (err) {
//         res.status(500).json({
//             code: "500",
//             status: "error",
//             message: "Internal Server Error",
//             error: err.message,
//         });
//     }
// });
Courses.post("/register", async (req : Request , res : Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const {body,empID,coursesID} = req.body

    if (!tokenkey || !contentType) {
        res.status(401).json({
            code: "401",
            status: "error",
            message: "Unauthorized",
        });
    }
    else if (!empID || !coursesID) {
        res.status(404).json({
            code: "404",
            status: "error",
            message: "EmpID/Course not found",
        });
    }
    else {
    const dbResults = await coursesResults.updateOne({ empID : empID.body },{ $set : {courseID : coursesID.body} }) 
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults
    }
    res.status(200).json(resultsData)
    }
})

Courses.get("/results", async (req : Request , res : Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const empID = req.params
    if (!tokenkey || !contentType) {
        res.status(401).json({
           code: "401",
           status: "error",
           message: "Unauthorized",
       });
}
        else if (!empID) {
        res.status(404).json({
           code: "404",
           status: "error",
           message: "EmpID not found",
       });
   }
   
   else {
    const dbResults = await coursesResults.find({ empID : empID.body })
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults
    }
    res.status(200).json(resultsData)
   }

})


Courses.post("/requests", async (req : Request , res : Response) => {
    const reqHeader: any = req.headers
    const contentType: any = reqHeader["content-type"]
    const tokenkey: any = reqHeader["authorization"]
    const {empID,courseID,reqid} = req.body
    if (!tokenkey || !contentType) {
        res.status(401).json({
           code: "401",
           status: "error",
           message: "Unauthorized",
       });
}
        else if (!empID || !courseID) {
        res.status(404).json({
           code: "404",
           status: "error",
           message: "EmpID/courseID not found",
       });
   }
   
   else {
    const dbResults = await coursesResults.create({ reqid : reqid.body })
    const resultsData: responseData = {
      code: "200",
      status: "OK",
      data: dbResults
    }
    res.status(200).json(resultsData)
   }

})


