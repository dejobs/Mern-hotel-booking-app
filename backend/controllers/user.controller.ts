import {NextFunction, Request, Response} from "express";
import User from "../models/user.model";
import errorHandler from "../utils/error";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import {UserType} from "../shared/types";

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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userId !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    const newUserDetails: UserType = req.body;

    if (req.body.password) {
      newUserDetails.password = bcryptjs.hashSync(req.body.password, 10);
    }

    //Upload image to clouldinary
    const imageFile = req.file as Express.Multer.File;
    let imageUrl = "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    newUserDetails.avatar = imageUrl;
    newUserDetails.firstName = req.body.firstName;
    newUserDetails.lastName = req.body.lastName;
    newUserDetails.email = req.body.email;
    newUserDetails.password = req.body.password;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      newUserDetails,
      {new: true}
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
async function uploadImage(image: Express.Multer.File) {
  const base64EncodedImage = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64EncodedImage}`;
  const response = await cloudinary.v2.uploader.upload(dataURI);
  const imageUrl = response.url;
  return imageUrl;
}
