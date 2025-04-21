import express, { Request, Response } from "express";
import { responseData, responseError } from "../interfaceRes/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../Schema/users";
import { SECRET_KEY } from "../middleware/route";

export const auth = express();
``;
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

interface LoginRequestBody {
  username: string;
  password: string;
}

auth.post(
  "/login",
  async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      const contentType = req.headers["content-type"];

      if (!contentType) {
        res.status(400).json({
          code: "400",
          status: "Failed",
          message: "Missing required headers: content-type",
        });
        return;
      }

      if (!username || !password) {
        res.status(400).json({
          code: "400",
          status: "Failed",
          message: "no username or password",
        });
        return;
      }

      const userData = await users.findOne({ username });
      if (!userData) {
        res.status(400).json({
          code: "400",
          status: "Failed",
          message: "invalid user",
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        res.status(400).json({
          code: "400",
          status: "Failed",
          message: "Invalid password",
        });
        return;
      }

      const payload = {
        userId: userData._id,
        username: userData.username,
        roles: userData.roles,
        status: userData.status,
      };

      const expiresIn = 7 * 24 * 60 * 60;

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn });

      res.status(200).json({
        code: "200",
        status: "Success",
        data: {
          message: "login success",
          token,
          expiresIn,
          empId: userData.empId,
          roles: userData.roles,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        code: "500",
        status: "Failed",
        message: "Internal server error",
      });
    }
  }
);