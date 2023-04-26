import { Request } from "express";

export interface PhotosCreationRequest extends Request {
  file?: Express.MulterS3.File;
}
