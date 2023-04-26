import { RequestHandlerParams } from "express-serve-static-core";

export type PhotosRequestHandlerParams = RequestHandlerParams & {
  file?: Express.MulterS3.File;
};
