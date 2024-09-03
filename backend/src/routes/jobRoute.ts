import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/jobController";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/get/admin/jobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
