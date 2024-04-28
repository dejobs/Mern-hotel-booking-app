import express from "express";
import {searchHotels} from "../controllers/hotels.controller";
import {getHotel} from "../controllers/hotels.controller";
import {param} from "express-validator";

const router = express.Router();

router.get("/search", searchHotels);

router.get(
  "/:hotelId",
  [param("hotelId").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);

export default router;
