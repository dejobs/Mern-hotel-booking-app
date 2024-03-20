import {Request, Response, NextFunction} from "express";
import cloudinary from "cloudinary";
import errorHandler from "../utils/error";
import Hotel from "../models/hotel.model";
import {HotelType} from "../models/hotel.model";

export const myHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //1. upload the images to cloudiary
    const uploadPromises = imageFiles.map(async (image) => {
      const base64EncodedImage = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64EncodedImage}`;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);

    //2. if upload was successful. add the URLs to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //3. save the new hotel in the data base
    const hotel = new Hotel(newHotel);
    await hotel.save();

    //4. return a 201 status
    res.status(201).send(hotel);
  } catch (err) {
    console.log("Error creating hotel: ", err);
    next(errorHandler(500, "Something went wrong"));
  }
};

/*
//ALTERNATIVE WAY fFOR LOOPING

export const myHotelss = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const Promises = [];

    const uploadImage = async (image: Express.Multer.File) => {
      const base64EncodedImage = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data${image.mimetype};base64,${base64EncodedImage}`;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    };

    for (let i = 0; i < imageFiles.length; i++) {
      Promises.push(uploadImage(imageFiles[i]));
    }

    const imageUrls = await Promise.all(Promises);
  } catch (e) {}
};

*/
