import express from "express";
import verifyToken from "../utils/verifyUser";
import {showMyBookings} from "../controllers/my-bookings.controller";

const router = express.Router();

router.get("/", verifyToken, showMyBookings);

export default router;
