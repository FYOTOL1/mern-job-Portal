import { Response } from "express";
import Company from "../models/Company";
import { CRequest } from "../types/publicTypes";
import { ICompany } from "../types/companyTypes";
import cloudinary from "../utils/cloudinary";
import getDataUri from "../utils/dataUri";

export const registerCompany: any = async (req: CRequest, res: Response) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is Required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "This company is already exist",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany: any = async (req: CRequest, res: Response) => {
  try {
    const userId = req.id;
    const userCompanies = await Company.find({ userId });
    if (!userCompanies) {
      return res
        .status(400)
        .json({ message: "Companies Not Found", success: false });
    }

    return res.status(200).json({
      companies: userCompanies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req: CRequest, res: Response) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req: CRequest, res: Response) => {
  try {
    const { name, description, website, location }: ICompany = req.body;
    const file = req.file;

    let cloudinaryResponse;
    if (file) {
      const fileUri = getDataUri(file as Express.Multer.File)
      if (fileUri && fileUri.content) {
        cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content as string);
      }
    }
    const findCompany = await Company.findById<ICompany>({ _id: req.params.id })
    let updateData;

    if (findCompany) {
      updateData =
      {
        name: name || findCompany.name,
        description: description || findCompany.description,
        website: website || findCompany.website,
        location: location || findCompany.location,
        logo: cloudinaryResponse?.secure_url || findCompany.logo
      };
    }
    const updateCompany = await Company.findOneAndUpdate({ _id: req.params.id }, updateData, {
      new: true,
    });

    if (!updateCompany) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Updated Successfully",
      company: updateCompany,
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      if (error.name === 'MongoServerError' && (error as any).code === 11000)
        return res.status(400).json({
          message: "Name Already Exist",
          success: false
        })
  }
};
