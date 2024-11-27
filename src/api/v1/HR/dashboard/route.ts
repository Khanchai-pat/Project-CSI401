import express, { Request, Response } from "express"
import { responseData, responseError } from "../../interfaceRes/response"
import { courseRequests } from "../../Schema/courseRequest"
import { courseResults } from "../../Schema/courseResults"
import { reimbursements } from "../../Schema/reimbursement"
import { employees } from "../../Schema/emp"
import { course } from "../../Schema/course"
export const dashBoard = express();

dashBoard.get("/dashBoard", async (req: Request, res: Response) => {
    const reqHeader: any = req.headers;
    const contentType: string = reqHeader["content-type"];
    const tokenkey: string = reqHeader["token-key"];

    if (!contentType || !tokenkey) {
        const verifyError: responseError = {
            code: "400",
            status: "Failed",
            message: "missing quried header : contentType And tokenKey"
        }
        res.status(400).json(verifyError)
    } else {
        try {
            const courseRequest = await courseRequests.find({})
            let allCourseRequest: any = 0
            for (let i = 0; i <= courseRequest.length; i++) {
                allCourseRequest = i
            }

            let allCourseResult: any = 0
            const courseResult = await courseResults.find({})
            for (let i = 0; i <= courseResult.length; i++) {
                allCourseResult = i
            }

            let allRefund: any = 0
            const refunds = await reimbursements.find({})
            for (let i = 0; i <= refunds.length; i++) {
                allRefund = i
            }

            let allEmp: any = 0
            const employee = await employees.find({})
            for (let i = 0; i <= employee.length; i++) {
                allEmp = i
            }

            const empInactive = await employees.find({ empStatus: "Inactive" })
            let inactives: any = 0
            for (let i = 0; i <= empInactive.length; i++) {
                inactives = i
            }

            const empActive = await employees.find({ empStatus: "Active" })
            let Actives: any = 0
            for (let i = 0; i <= empActive.length; i++) {
                Actives = i
            }
            const courses = await course.find({})
            let allCourse: any = 0
            for (let i = 0; i <= courses.length; i++) {
                allCourse = i
            }
            const showDashboard: {} = {
                allEmps: allEmp,
                empInactives: inactives,
                empActives: Actives,
                courseRequests: allCourseRequest,
                courseResults: allCourseResult,
                refunds: allRefund,
                courses: allCourse
            }
            const successData: responseData = {
                code: '200',
                status: 'OK',
                data: showDashboard
            }
            res.status(200).json(successData)
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
})