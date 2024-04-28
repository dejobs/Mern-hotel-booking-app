import {Request, Response, NextFunction} from "express";
import Hotel from "../models/hotel.model";
import {HotelSearchResponse} from "../shared/types";
import errorHandler from "../utils/error";
import {validationResult} from "express-validator";

export const searchHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = {starRating: -1};
        break;
      case "pricePerNightAsc":
        sortOptions = {pricePerNight: 1};
        break;
      case "pricePerNightDesc":
        sortOptions = {pricePerNight: -1};
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.log("err", error);
    res.status(500).json("something went wrong");
  }
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      {city: new RegExp(queryParams.destination, "i")},
      {country: new RegExp(queryParams.destination, "i")},
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = {$in: starRatings};
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice.toString()),
    };
  }

  return constructedQuery;
};
//$gte means Greater than or equal
//$eq is comparison operator for equal to
//$lte means lesser than or equal
//i mean ignore case sensitivity, RegExp is regular expression

/****getHotel controller*****/

export const getHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    res.status(201).json(hotel);
  } catch (error) {
    next(errorHandler(500, "Error fetching hotel"));
  }
};
