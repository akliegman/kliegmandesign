import { Request, RequestHandler, Response, NextFunction } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Config, s3ConfigBucket } from "../config/s3";
import { photosConfig } from "../config/photos";
import path from "path";
import { logger } from "../utils/logger";

const s3Client: S3Client = new S3Client(s3Config);

export const uploadPhoto: (
  _req: Request,
  res: Response,
  next: NextFunction
) => Response | void = (_req: Request, res: Response, next: NextFunction) => {
  logger.info("-------------------------------------------------------");
  logger.info("UPLOADING PHOTO");
  logger.info("-------------------------------------------------------");

  const upload: RequestHandler = multer({
    storage: multerS3({
      s3: s3Client!,
      bucket: s3ConfigBucket!,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req: Request, file: Express.MulterS3.File, cb: any) => {
        cb(null, `${photosConfig.directory}/${file.originalname}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    fileFilter(
      req: Request,
      file: Express.MulterS3.File,
      cb: FileFilterCallback
    ): void {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      }

      return cb(new Error("Error: Images only!"));
    },
  }).single("file");

  upload(_req, res, (err: any) => {
    if (err) {
      logger.error(err);
      return res.status(400).send({
        message: err.message,
      });
    } else {
      logger.info("Photo uploaded.");
      next();
    }
  });
};
