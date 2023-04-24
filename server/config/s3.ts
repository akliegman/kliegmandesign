import * as dotenv from "dotenv";
import { S3Config } from "../types/config";

dotenv.config();

export const s3Config: S3Config = {
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  sslEnabled: false,
  signatureVersion: "v4",
  s3forcePathStyle: true,
};

export const s3ConfigBucket: string = process.env.AWS_BUCKET_NAME!;
