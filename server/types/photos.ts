import { Request } from "express";

export interface RequestWithFile extends Request {
  file: Express.MulterS3.File;
}
