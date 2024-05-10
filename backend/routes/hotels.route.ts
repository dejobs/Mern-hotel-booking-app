import express from "express";
import {
  bookingPaymentIntent,
  searchHotels,
  hotelBookings,
} from "../controllers/hotels.controller";
import {getHotel} from "../controllers/hotels.controller";
import {param} from "express-validator";
import verifyToken from "../utils/verifyUser";

const router = express.Router();

router.get("/search", searchHotels);

router.get(
  "/:hotelId",
  [param("hotelId").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  bookingPaymentIntent
);

router.post("/:hotelId/bookings", verifyToken, hotelBookings);

export default router;
