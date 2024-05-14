import {Request, Response, NextFunction} from "express";
import Hotel from "../models/hotel.model";
import {
  BookingType,
  HotelSearchResponse,
  PaymentIntentResponse,
} from "../shared/types";
import errorHandler from "../utils/error";
import {validationResult} from "express-validator";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

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

/*******Booking payment-intent controller */
export const bookingPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {numberOfNights} = req.body;
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return next(errorHandler(400, "Hotel not found"));
  }

  const totalCost = hotel.pricePerNight * numberOfNights;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "gbp",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return next(errorHandler(500, "Error creating payment intent"));
    }

    const response: PaymentIntentResponse = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response).status(201);
  } catch (error) {
    res.status(500).json({message: "Error creating payment intent"});
  }
};

/**Hotel Bookings controller */
export const hotelBookings = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({message: "payment intent not found"});
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({message: "payment intent mismatch"});
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      {_id: req.params.hotelId},
      {
        $push: {bookings: newBooking},
      }
    );

    if (!hotel) {
      return res.status(400).json({message: "hotel not found"});
    }

    await hotel.save();
    res.status(200).json({message: "Booking success"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "something went wrong"});
  }
};

/** ConstructSearchQuery Function for Search page */
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