import { Request } from "express";
import { Optional } from "sequelize";
import { RequestHandlerParams } from "express-serve-static-core";

export interface PhotoAttributes {
  id: number;
  name: string;
  albumId: number;
  imageUrl: string;
  awsUrl: string | null;
  mimetype: string;
  published: boolean;
}

export interface PhotoCreationAttributes
  extends Optional<PhotoAttributes, "id"> {}

export interface RequestWithFile extends Request {
  file?: Express.MulterS3.File;
}

export type RequestHandlerWithFile = RequestHandlerParams & {
  file?: Express.MulterS3.File;
};
