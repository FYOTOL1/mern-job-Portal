import mongoose from "mongoose";

interface IProfile {
  bio?: string;
  skills?: string[];
  resume?: string; // Resume URL
  resumeOriginalName?: string;
  company?: mongoose.Schema.Types.ObjectId;
  profilePhoto?: string;
}

interface IUser {
  _id?: String;
  fullName: string;
  phoneNumber: number;
  email: string;
  password?: string;
  role: "student" | "recruiter";
  profile?: IProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IUser };
