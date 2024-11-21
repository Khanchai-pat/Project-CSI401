import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"
import mongoose from "mongoose";
import { useSwagger } from "../miidleware/swagger";
// const morgan = require('morgan');

import { auth } from "./api/v1/auth/auth";
import { checkData } from "./api/v1/HR/checkdata/route";
import { manageData } from "./api/v1/HR/managedata/route";
import { course } from "./api/v1/HR/withdrawRequest/route";
import { courseUpdate } from "./api/v1/HR/courseResults/route";
import { refunds } from "./api/v1/HR/refunds/route";
import { history } from "./api/v1/HR/history/route";

// MEP
import { checkdata } from "./api/v1/EMP/Checkdata/results";
import { dashBoard } from "./api/v1/HR/dashboard/route";
import { Courses } from "./api/v1/EMP/Course/route";


dotenv.config();

// Connect to MongoDB when server starts
mongoose.connect(process.env.MONGOBD_URL!)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))

app.use("/auth", auth)
app.use("/checkData", checkData)
app.use("/manageData", manageData)
app.use("/course", course)
app.use("/courseupdate", courseUpdate)
app.use("/refunds", refunds)
app.use("/history", history)
app.use("/dashBoard", dashBoard)

//EMP
app.use("/checkdata", checkdata)
app.use("/courses", Courses)

// swagger
useSwagger(app)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


