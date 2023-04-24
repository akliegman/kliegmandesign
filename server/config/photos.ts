import * as dotenv from "dotenv";

dotenv.config();

interface PhotosConfig {
  directory: string;
}

export const photosConfig = {
  directory: process.env.ENV === "local" ? "photos-local" : "photos",
};
