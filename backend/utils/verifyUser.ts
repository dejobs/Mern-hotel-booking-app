import {NextFunction, Request, Response} from "express";
import Jwt, {JwtPayload} from "jsonwebtoken";
import errorHandler from "./error";

/* Add userId property to Request type in Express namespace */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;
  if (!token) next(errorHandler(401, "Unauthorized"));
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (err) {
    return next(errorHandler(401, "Unauthorized"));
  }
};

export default verifyToken;
