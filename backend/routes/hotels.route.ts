import express from "express";
import {searchHotels} from "../controllers/hotels.controller";

const router = express.Router();

router.get("/search", searchHotels);

export default router;
