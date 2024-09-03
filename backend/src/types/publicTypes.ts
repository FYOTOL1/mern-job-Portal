import { Request } from "express";

export interface CRequest extends Request {
  id?: string;
  file?: Express.Multer.File;
}
