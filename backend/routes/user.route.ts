import express from "express";
import multer from "multer";
import verifyToken from "../utils/verifyUser";
import {currentUser} from "../controllers/user.controller";
import {updateUser} from "../controllers/user.controller";

const router = express.Router();

// Multer middleware
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  }, // Setting the file size limit to 3MB
});

router.get("/me", verifyToken, currentUser);
router.put("/update/:id", verifyToken, upload.single("avatar"), updateUser);

export default router;
