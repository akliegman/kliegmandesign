import * as dotenv from "dotenv";
import { PhotosConfig } from "../types/config";

dotenv.config();

export const photosConfig: PhotosConfig = {
  directory: process.env.ENV === "local" ? "photos-local" : "photos",
};
