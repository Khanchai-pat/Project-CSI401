import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Secret Key สำหรับใช้ในการตรวจสอบ token
export const SECRET_KEY = process.env.MY_SECRET_KEY || "defaultSecretKey";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({
        code: "401",
        status: "Unauthorized",
        message: "Access denied. No token provided.",
      });
    } else {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;

      next();
    }
  } catch (err) {
    res.status(401).json({
      code: "401",
      status: "Unauthorized",
      message: "Invalid or expired token.",
    });
  }
};
