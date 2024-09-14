import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new ClientError("Token is required"));
  }
  let tokenlimpio = token.split(" "); // token arreglado por parametros 
  let limpiotoken = tokenlimpio[tokenlimpio.length - 1]
console.log("token", tokenlimpio, limpiotoken);

  try {
    const decoded = jwt.verify(limpiotoken, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
  } catch (error) {
    next(new ClientError("Invalid token"));
  }
  console.log("Token Check OK");

  next();
};

export default checkLogin;
