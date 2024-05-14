import {Request, Response} from "express";
import Hotel from "../models/hotel.model";
import {HotelType} from "../shared/types";

export const showMyBookings = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const hotels = await Hotel.find({"bookings.userId": userId});

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({message: "Can not find User booking"});
  }
};
