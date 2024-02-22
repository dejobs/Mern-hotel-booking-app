import express from "express";
import {signup} from "../controllers/auth.controller";
import {check} from "express-validator";

const router = express.Router();

const validatorCheck = [
  check("firstName", "Firstname is required").isString(),
  check("lastName", "Lastname is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

router.post("/signup", validatorCheck, signup);

export default router;
