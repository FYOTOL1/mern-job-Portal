import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController";
import { singleUpload } from "../middlewares/multer";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.post("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;
