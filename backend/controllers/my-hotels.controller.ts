import {Request, Response, NextFunction} from "express";
import cloudinary from "cloudinary";
import errorHandler from "../utils/error";
import Hotel from "../models/hotel.model";
import {HotelType} from "../shared/types";

export const myHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //1. upload the images to cloudiary
    const imageUrls = await uploadImages(imageFiles);

    //2. if upload was successful. add the URLs, Date, and userID to the new hotel
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

export const myHotelListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelListings = await Hotel.find({userId: req.userId});
    res.status(200).json(hotelListings);
  } catch (error) {
    res.status(500).json({message: "Error fetching my hotel listings"});
  }
};

export const getMyHotelListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id.toString();
  try {
    const myHotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.status(200).json(myHotel);
  } catch (error) {
    res.status(500).json({message: "Error fetching hotel"});
  }
};

export const updateMyHotelListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const myHotel = await Hotel.findById(req.params.hotelId);

  if (!myHotel) {
    return next(errorHandler(404, "Hotel not found"));
  }
  try {
    const files = req.files as Express.Multer.File[];
    const updatedHotel: HotelType = req.body;

    // 1. Upload images to Cloudinary
    const updatedImagesUrls = await uploadImages(files);

    //2. if upload was successful to cloudinary, add the URLs and  Date to the updatedHotel
    updatedHotel.lastUpdated = new Date();
    updatedHotel.imageUrls = [
      ...updatedImagesUrls,
      ...(updatedHotel.imageUrls || []),
    ];

    //3. save the updatedhotel in the database
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      {new: true}
    );
    res.status(201).json(updatedHotel);
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
};

// Cloudiary Uploading function //

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const base64EncodedImage = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64EncodedImage}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

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
