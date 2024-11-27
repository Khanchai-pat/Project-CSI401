import express, { Request, Response } from "express";
import { responseData, responseError } from "../interfaceRes/response";

import jwt from "jsonwebtoken";
import { users } from "../Schema/users";

export const auth = express();
const secretKey = process.env.SECRET_KEY || "defaultSecretKey";

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
      if (userData?.password !== password) {
        const error: responseError = {
          code: "400",
          status: "Failed",
          message: "invalid password",
        };
        res.status(400).json(error);
      } else {
        const payload = {
          userId: userData?._id,
          username: userData?.username,
          roles: userData?.role,
        };
        
        const options ={ expiresIn: "1h" }

        const token = jwt.sign(payload, secretKey, options);

        const response: responseData = {
          code: "200",
          status: "Success",
          data: {
            message: "login success",
            token: token,
          },
        };
        res.status(200).json(response);
      }
    }
  }
});
