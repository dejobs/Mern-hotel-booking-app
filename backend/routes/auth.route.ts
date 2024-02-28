import express from "express";
import {signup, validateToken} from "../controllers/auth.controller";
import {check} from "express-validator";
import {signin} from "../controllers/auth.controller";
import {signout} from "../controllers/auth.controller";
import verifyToken from "../utils/verifyUser";

const router = express.Router();

//Validator check for signup page //
const validatorCheck = [
  check("firstName", "Firstname is required").isString(),
  check("lastName", "Lastname is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

//Validator check for signin page //
const validatorCheck2 = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

router.post("/signup", validatorCheck, signup);
router.post("/signin", validatorCheck2, signin);
router.get("/validate-token", verifyToken, validateToken);
router.get("/signout", signout);

export default router;
