import express, { Request, Response } from "express";
import { responseData, responseError } from "../interfaceRes/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { users } from "../Schema/users";
import { SECRET_KEY } from "../middleware/route";


export const auth = express();
/**
 * @swagger
 *  /auth/login:
 *   post:
 *     summary: API Login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: No username or password
 */
auth.post("/login", async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const contentType: any = reqHeader["content-type"];
  const { username, password }: any = req.body;

  if (!contentType) {
    const missingHeadersError: responseError = {
      code: "400",
      status: "Failed",
      message: "Missing required headers: content-type",
    };
    res.status(400).json(missingHeadersError);
  } else {
    if (!username || !password) {
      const error: responseError = {
        code: "400",
        status: "Failed",
        message: "no username or password",
      };
      res.status(400).json(error);
    } else {

      const userData = await users.findOne({ username: username });
      console.log("username:", userData);
      console.log("Password:", userData ? userData.password : "No password found");

      if (!userData) {
        const error: responseError = {
          code: "400",
          status: "Failed",
          message: "invalid user",
        };
        res.status(400).json(error);
      } else {
        // ถ้ามีให้ทำสิ่งนี้
        const isMatch = await bcrypt.compare(password, userData.password)
        console.log(isMatch)

        if (!isMatch) {
          const error: responseError = {
            code: "400",
            status: "Failed",
            message: "Invalid password",
          };
          res.status(400).json(error);
        } else {

          //payload
          const payload = {
            userId: userData?._id,
            username: userData?.username,
            roles: userData?.roles,
            status: userData?.status
          };

          // const options = { expiresIn: 30 }
          const options = { expiresIn: "10h" }

          //generate token
          const token = jwt.sign(payload, SECRET_KEY, options);

          const response: responseData = {
            code: "200",
            status: "Success",
            data: {
              message: "login success",
              token: token,
              empId: userData?.empId,
              roles: userData?.roles 
            },
          };
          res.status(200).json(response);
        }
      }
    }
  }
});
