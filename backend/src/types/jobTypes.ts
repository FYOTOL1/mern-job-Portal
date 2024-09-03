import mongoose from "mongoose";

interface IJob {
  title: string;

  description: string;

  requirements?: string;

  salary: number;

  experience: number;

  location: string;

  jobType: string;

  position: number;

  company: mongoose.Schema.Types.ObjectId;

  created_by: mongoose.Schema.Types.ObjectId;

  applications?: mongoose.Schema.Types.ObjectId[];

  createdAt?: Date;

  updatedAt?: Date;
}

export { IJob };
