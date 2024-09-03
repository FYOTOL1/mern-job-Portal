import express, { Response } from "express";
import { CRequest } from "../types/publicTypes";
import Application from "../models/Application";
import Job from "../models/Job";

const router = express.Router();

export const applyJob = async (req: CRequest, res: Response) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    const existingApp = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApp) {
      return res.status(400).json({
        message: "You have already applied for this jobs",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApp = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApp._id);
    job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req: CRequest, res: Response) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req: CRequest, res: Response) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req: CRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        message: "Status Is Required",
        success: true,
      });
    }

    const application = await Application.findOne({ _id: id });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default router;
