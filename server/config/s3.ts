import * as dotenv from "dotenv";

dotenv.config();

interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  sslEnabled?: boolean;
  signatureVersion?: string;
  s3forcePathStyle?: boolean;
}

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
