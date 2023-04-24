import { Request, Response, NextFunction } from "express";
import { db } from "../models";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import path from "path";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Config, s3ConfigBucket } from "../config/s3";
import { photosConfig } from "../config/photos";
import { logger } from "../utils/logger";
import { RequestWithFile } from "../types/photos";

const s3Client = new S3Client(s3Config);

const Photos = db.photos;

export const findAllPhotos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING ALL PHOTOS");
  logger.info("-------------------------------------------------------");

  try {
    const photos = await Photos.findAll();
    logger.info(`${photos.length} photos found.`);
    return res.send(photos);
  } catch (error: any) {
    return res.status(500).send({
      message: `Error occurred while retrieving photos: ${error.message}`,
    });
  }
};

export const createPhoto = async (
  req: RequestWithFile,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("CREATING PHOTO IN DB");
  logger.info("-------------------------------------------------------");

  try {
    if (!req.file) {
      logger.error("No file found in request.");
      return res.status(400).send({
        message: "No file found in request.",
      });
    }

    const photo = {
      name: req.file.originalname,
      albumId: req.body.albumId || 1,
      imageUrl: `/${req.file.key}`,
      awsUrl: req.file.location,
      mimetype: req.file.mimetype,
      published: true,
    };

    const newPhoto = await Photos.create(photo);
    logger.info(`Photo created: ${photo.name}`);

    return res.send(newPhoto);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send({
      message: `Error occurred while creating the photo: ${error.message}`,
    });
  }
};

export const deletePhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("DELETING PHOTO FROM DB");
  logger.info("-------------------------------------------------------");

  const id = req.params.id;

  try {
    const num = await Photos.destroy({ where: { id } });
    if (num === 1) {
      const successMessage = `Photo with id=${id} was deleted successfully!`;
      logger.info(successMessage);
      return res.send({
        message: successMessage,
      });
    }
    const failureMessage = `Cannot delete photo with id=${id}.`;
    logger.error(failureMessage);
    return res.send({
      message: failureMessage,
    });
  } catch (error: any) {
    const errorMessage = `Could not delete photo with id=${id}: ${error.message}`;
    logger.error(errorMessage);
    return res.status(500).send({
      message: errorMessage,
    });
  }
};

export const findOnePhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING A PHOTO IN DB");
  logger.info("-------------------------------------------------------");

  const id: number = Number(req.params.id);

  try {
    const photo = await Photos.findByPk(id);
    if (photo) {
      return res.send(photo);
    }
    return res.status(404).send({
      message: `Photo with id=${id} was not found`,
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send({
      message: `Error retrieving photo with id=${id}: ${error.message}`,
    });
  }
};

export const findAllPhotosByAlbumId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING PHOTOS IN DB BY ALBUM ID");
  logger.info("-------------------------------------------------------");

  const id = req.params.id;

  try {
    const data = await Photos.findAll({
      where: { albumId: id },
    });

    if (data.length === 0) {
      const notFoundMessage = `No photos found with albumId=${id}`;
      logger.error(notFoundMessage);
      return res.status(404).send({
        message: notFoundMessage,
      });
    }

    logger.info(`${data.length} photos found with albumId=${id}`);
    return res.send(data);
  } catch (error: any) {
    const errorMessage = `Error retrieving photos with albumId=${id}: ${error.message}`;
    logger.error(errorMessage);
    return res.status(500).send(errorMessage);
  }
};

export const updatePhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("UPDATING PHOTO IN DB");
  logger.info("-------------------------------------------------------");

  const id = req.params.id;

  try {
    const [num, updatedPhoto] = await Photos.update(req.body, {
      where: { id },
      returning: true,
    });

    if (num === 1) {
      const successMessage = `Photo with id=${id} was updated successfully.`;
      logger.info(successMessage);
      return res.send({
        message: successMessage,
        photo: updatedPhoto[0],
      });
    } else {
      const message = `Cannot update photo with id=${id}.`;
      logger.error(message);
      return res.send(message);
    }
  } catch (error: any) {
    const errorMessage = `Error updating photo with id=${id}: ${error.message}`;
    logger.error(errorMessage);
    return res.status(500).send(errorMessage);
  }
};

export const getPhoto = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("GETTING PHOTO FROM S3");
  logger.info("-------------------------------------------------------");

  if (!req.params.imageId) {
    logger.error("No image id in request");
    return res.status(400).send("No image id in request");
  }

  const getImageType = (key: string): string => {
    const imageTypes: { [type: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
    };

    const extension = key.split(".").pop()!;

    return imageTypes[extension];
  };

  const params = {
    Bucket: s3ConfigBucket,
    Key: `${photosConfig.directory}/${req.params.imageId}`,
  };
  const command = new GetObjectCommand(params);

  try {
    const data = await s3Client.send(command);
    const key = `${photosConfig.directory}/${req.params.imageId}`;

    logger.info(`Image found: ${key}`);
    res.writeHead(200, { "Content-Type": getImageType(key) });
    res.write(data.Body as any, "binary");
  } catch (error: any) {
    const errorMessage = `Error getting image: ${error.message}`;
    return res.status(404).send("File not found.");
  }

  logger.info("Image sent successfully");
  return res.end(null, "binary");
};
