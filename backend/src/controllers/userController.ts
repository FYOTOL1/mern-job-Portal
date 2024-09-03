import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../types/userTypes";
import { CRequest } from "../types/publicTypes";
import getDataUri from "../utils/dataUri";
import cloudinary from "../utils/cloudinary"

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phoneNumber, password, role }: IUser = req.body;

    const file = req.file;
    const fileUri = getDataUri(file as Express.Multer.File)
    let cloudinaryResponse;
    if (fileUri && fileUri.content) {
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content as string);
    }

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is Messing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create<IUser>({
      fullName,
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudinaryResponse?.secure_url
      }
    });

    return res
      .status(201)
      .json({
        message: "Created Account Successfully",
        user: createUser,
        success: true
      });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is Messing", success: false });
    }

    let user = await User.findOne<IUser>({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password", success: false });
    }

    let isPasswordMatch;
    if (user.password) {
      isPasswordMatch = await bcrypt.compare(password, user.password);
    }
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }

    const tokenBody = {
      userId: user._id,
    };
    const token = await jwt.sign(
      tokenBody,
      (process.env.SECRET_JWT_KEY as string) || "ahmedahmosahmedaos12212",
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
      })
      .json({ message: `Welcome Back ${user.fullName}`, user, success: true });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .cookie("toke", "", { maxAge: 0 })
      .json({ message: "Logged Out Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req: CRequest, res: Response) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;

    let cloudinaryResponse;
    const fileUri = getDataUri(file as Express.Multer.File)
    if (fileUri && fileUri.content) {
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content as string);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (user.profile && bio) user.profile.bio = bio;
    if (user.profile && skills) user.profile.skills = skillsArray;
    if (cloudinaryResponse && user?.profile) {
      user.profile.resume = cloudinaryResponse.secure_url
      user.profile.resumeOriginalName = file?.originalname
    };

    const updateUser = await User.findOneAndUpdate(user._id, user, {
      new: true,
    });

    return res.status(200).json({
      message: "Profile Updated Successfully",
      updateUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, updateProfile };
