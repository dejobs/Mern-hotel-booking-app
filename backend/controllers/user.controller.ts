import {Request, Response} from "express";
import User from "../models/user.model";

export const currentUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({message: "User not found"});
    }
    res.json(user).status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
};
