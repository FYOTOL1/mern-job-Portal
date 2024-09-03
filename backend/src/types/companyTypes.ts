import mongoose from "mongoose";

interface ICompany {
  name: string;

  description: string;

  website: string;

  location: string;

  logo: string;

  userId: mongoose.Schema.Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}

export { ICompany };
