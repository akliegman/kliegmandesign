import { Request, Response } from "express";
import { db } from "../models/db";
import { logger } from "../utils/logger";

const Albums = db.albums;

export const findAllAlbums = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING ALL ALBUMS");
  logger.info("-------------------------------------------------------");

  try {
    const data = await Albums.findAll();
    logger.info(`${data.length} albums found.`);
    return res.send(data);
  } catch (error: any) {
    return res.status(500).send({
      message: `Error retrieving albums: ${error.message}`,
    });
  }
};
