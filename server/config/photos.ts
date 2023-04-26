import * as dotenv from "dotenv";
import { PhotosConfig } from "./photos.interface";

dotenv.config();

export const photosConfig: PhotosConfig = {
  directory: process.env.ENV === "local" ? "photos-local" : "photos",
};
