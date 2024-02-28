import {NextFunction, Request, Response} from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import {validationResult} from "express-validator";
import errorHandler from "../utils/error";
import {UserType} from "../models/user.model";

// SIGNUP CONTROLLER //

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

    const user = await User.findOne({email});
    if (user) return next(errorHandler(400, "User already exist!"));

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
      process.env.JWT_SECRET_KEY as string,
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

// SIGNIN CONTROLLER //

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()});
  }
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(404, "Invalid credentials!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials!"));
    const token = jwt.sign(
      {userId: validUser._id},
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: "1d"}
    );

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({userId: validUser._id});
  } catch (err) {
    next(err);
  }
};

export const signout = (req: Request, res: Response) => {
  res
    .clearCookie("auth_token")
    .status(200)
    .json("user logged out successfully!");
};

export const validateToken = (req: Request, res: Response) => {
  res.status(201).send({userId: req.userId});
};
