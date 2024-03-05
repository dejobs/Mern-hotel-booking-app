import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO as string)
  .then(() => console.log("connected live to the mongodb server!!!"))
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/auth", authRouter);

app.listen(6500, () => {
  console.log("app running at port 6500!");
});

//Middleware

type Error = {
  statusCode: number;
  message: string;
};

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
