import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"
import mongoose from "mongoose";
import { useSwagger } from "../miidleware/swagger";
// const morgan = require('morgan');

//HR
import { auth } from "./api/v1/auth/auth";
import { checkData } from "./api/v1/HR/checkdata/route";
import { manageData } from "./api/v1/HR/manageEmp/route";
import { withdrawRequest } from "./api/v1/HR/withdrawRequest/route";
import { courseResult } from "./api/v1/HR/courseResults/route";
import { reimbursement } from "./api/v1/HR/reimbursement/route";
import { history } from "./api/v1/HR/history/route";
import { dashBoard } from "./api/v1/HR/dashboard/route";
import { courses } from "./api/v1/HR/courseManage/route"

// MEP
import { checkdata } from "./api/v1/EMP/Checkdata/results";
import { Courses } from "./api/v1/EMP/Course/route";
import { enrollment } from "./api/v1/HR/enrollment/route";
import { empReimbursement } from "./api/v1/EMP/reimbursements/route";



dotenv.config();

// Connect to MongoDB when server starts
mongoose.connect(process.env.mongocloud!)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));


const app = express();
app.use(express.json({
    strict: true, // ป้องกัน JSON ไม่ถูกต้อง
}));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))

app.use("/auth", auth)
app.use("/checkData", checkData)
app.use("/manageData", manageData)
app.use("/withdrawRequest", withdrawRequest)
app.use("/courseResult", courseResult)
app.use("/reimbursement", reimbursement)
app.use("/history", history)
app.use("/dashBoard", dashBoard)
app.use("/enrollment", enrollment)
app.use("/courses", courses)

//EMP
app.use("/checkdata", checkdata)
app.use("/courses", Courses)
app.use("/reimbursements", empReimbursement)

// swagger
useSwagger(app)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


