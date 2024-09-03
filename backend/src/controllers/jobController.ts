import { Response } from "express";
import { CRequest } from "../types/publicTypes";
import Job from "../models/Job";

export const postJob = async (req: CRequest, res: Response) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is Messing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New Job Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req: CRequest, res: Response) => {
  try {
    const keyword = req.query.keyword?.toString().toLowerCase() || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };

    const jobs = await Job.find(query).populate({
      path: "company"
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req: CRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req: CRequest, res: Response) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company"
    })
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      adminId,
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
