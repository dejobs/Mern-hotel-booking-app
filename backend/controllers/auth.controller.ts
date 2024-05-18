import {NextFunction, Request, Response} from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import {validationResult} from "express-validator";
import errorHandler from "../utils/error";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

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

// SIGNOUT CONTROLLER //
export const signout = (req: Request, res: Response) => {
  res
    .clearCookie("auth_token")
    .status(200)
    .json("user logged out successfully!");
};

export const validateToken = (req: Request, res: Response) => {
  res.status(201).send({userId: req.userId});
};

// GOOGLE CONTROLLER //

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      const token = jwt.sign(
        {userId: user._id},
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
        .json({userId: user._id});
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      if (!newUser) return next(errorHandler(401, "Invalid credentials!"));
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
    }
  } catch (error) {
    next(error);
  }
};
