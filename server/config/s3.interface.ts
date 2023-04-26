export interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  sslEnabled?: boolean;
  signatureVersion?: string;
  s3forcePathStyle?: boolean;
}
