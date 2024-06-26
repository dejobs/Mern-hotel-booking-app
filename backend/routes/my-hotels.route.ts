import express from "express";
import multer from "multer";
import {addMyNewHotel} from "../controllers/my-hotels.controller";
import verifyToken from "../utils/verifyUser";
import {body} from "express-validator";
import {myHotelListings} from "../controllers/my-hotels.controller";
import {getMyHotelListing} from "../controllers/my-hotels.controller";
import {updateMyHotelListing} from "../controllers/my-hotels.controller";

const router = express.Router();

// Multer middleware
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }, // Setting the file size limit to 10MB
});

// Validator for my-hotels endpoint
const myHotelValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required "),
];

router.post(
  "/",
  verifyToken,
  myHotelValidator,
  upload.array("imageFiles", 6),
  addMyNewHotel
);

router.get("/", verifyToken, myHotelListings);

router.get("/:id", verifyToken, getMyHotelListing);

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles", 6),
  updateMyHotelListing
);

export default router;
