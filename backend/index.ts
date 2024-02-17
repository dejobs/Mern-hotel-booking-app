import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO as string)
  .then(() => console.log("connected live to the mongodb server!!!"))
  .catch((err) => console.log("err"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/api/test", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(6500, () => {
  console.log("app running at port 6500!");
});
