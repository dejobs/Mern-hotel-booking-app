import {NextFunction, Request, Response} from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import {validationResult} from "express-validator";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()});
  }
  try {
    const {email, password, firstName, lastName} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    const token = jwt.sign(
      {userId: newUser._id},
      process.env.JWT_SECRET_kEY as string,
      {expiresIn: "1d"}
    );

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json("user created successfully!");
  } catch (error) {
    next(error);
  }
};
