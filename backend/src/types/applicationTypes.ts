import mongoose from "mongoose";

interface IApplication {
  job: mongoose.Schema.Types.ObjectId;

  applicant: mongoose.Schema.Types.ObjectId;

  status?: "pending" | "accepted" | "rejected";

  createdAt?: Date;

  updatedAt?: Date;
}

export { IApplication };
