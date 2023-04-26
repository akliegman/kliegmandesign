import { Request, Response, NextFunction } from "express";
import { db } from "../models/db";
import { SessionCreationAttributes } from "../models/sessions.interface";
import { logger } from "../utils/logger";

const Sessions = db.sessions;

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info("-------------------------------------------------------");
  logger.info("CREATING SESSION");
  logger.info("-------------------------------------------------------");
  try {
    const sessionData: SessionCreationAttributes = {
      sid: req.session?.sid,
      user: req.session?.user?.user,
      email: req.session?.user?.email || undefined,
      role: req.session?.user?.role,
      ipAddress: req.session?.ipAddress,
      userAgent: req.session?.userAgent,
      referer: req.session?.referer,
      expiresAt: req.session?.expiresAt,
      isNew: req.session?.isNew,
    };

    const session = await Sessions.create(sessionData);
    logger.info(`Session created: ${session.sid}`);

    next();
  } catch (error: any) {
    logger.error(error);
  }
};

export const findAllSessions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("FINDING ALL SESSIONS");
  logger.info("-------------------------------------------------------");
  try {
    const sessions = await Sessions.findAll();
    logger.info(`${sessions.length} sessions found.`);
    return res.send(sessions);
  } catch (error: any) {
    const message = `Error occurred while retrieving sessions: ${error.message}`;
    logger.error(message);
    return res.status(500).send({
      message,
    });
  }
};
