import express from "express";
import verifyToken from "../utils/verifyUser";
import {currentUser} from "../controllers/user.controller";

const router = express.Router();

router.get("/me", verifyToken, currentUser);

export default router;
