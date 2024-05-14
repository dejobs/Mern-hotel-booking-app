import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import myHotelRouter from "./routes/my-hotels.route";
import hotelRouter from "./routes/hotels.route";
import userRouter from "./routes/users.route";
import myBookingsRouter from "./routes/my-bookings.route";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/my-hotels", myHotelRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/user", userRouter);
app.use("/api/my-bookings", myBookingsRouter);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

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
