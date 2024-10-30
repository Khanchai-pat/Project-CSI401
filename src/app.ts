import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"
// const morgan = require('morgan');


import { auth } from "./api/v1/HR/auth/route";
import { checkData } from "./api/v1/HR/checkdata/route";
import { manageData } from "./api/v1/HR/managedata/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))

app.use("/auth", auth)
app.use("/checkData", checkData)
app.use("/manageData", manageData)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});