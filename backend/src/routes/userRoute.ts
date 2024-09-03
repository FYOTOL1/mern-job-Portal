import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/isAuthenticated";
import { singleUpload } from "../middlewares/multer";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
