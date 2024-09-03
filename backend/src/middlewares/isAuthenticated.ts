import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const KEY = (process.env.SECRET_JWT_KEY as string) || "ahmedahmosahmedaos12212";

interface CRequest extends Request {
  id?: string;
}

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

const isAuthenticated = async (
  req: CRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User Not Authenticated", success: false });
    }

    const decode = jwt.verify(token, KEY) as MyJwtPayload;
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
