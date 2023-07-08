import { Request, Response, NextFunction } from "express";
import { db } from "../models/db";
import { VitalCreationAttributes } from "../models/vitals.interface";
import { logger } from "../utils/logger";

const Vitals = db.vitals;

export const createVital = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info("-------------------------------------------------------");
  logger.info("CREATING VITALS");
  logger.info("-------------------------------------------------------");
  try {
    const vitalsData: VitalCreationAttributes = {
      uuid: req.body?.uuid,
      appSessionUuid: req.body?.appSessionUuid,
      CLS: req.body.CLS,
      FID: req.body.FID,
      LCP: req.body.LCP,
      TTFB: req.body.TTFB,
      FCP: req.body.FCP,
    };

    const vitals = await Vitals.create(vitalsData);
    logger.info(`Vitals created: ${vitals.uuid}`);

    next();
  } catch (error: any) {
    logger.error(error);
  }
};

export const findAllVitals = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING ALL VITALS");
  logger.info("-------------------------------------------------------");
  try {
    const vitals = await Vitals.findAll();
    logger.info(`${vitals.length} vitals found.`);
    return res.send(vitals);
  } catch (error: any) {
    const message = `Error occurred while retrieving vitals: ${error.message}`;
    logger.error(message);
    return res.status(500).send({
      message,
    });
  }
};
