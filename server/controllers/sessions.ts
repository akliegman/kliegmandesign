import { Request, Response, NextFunction } from "express";
import { slackConfig } from "../config/slack";
import { authConfig } from "../config/auth";
import { db } from "../models/db";
import { SessionCreationAttributes } from "../models/sessions.interface";
import { logger } from "../utils/logger";
import { WebClient } from "@slack/web-api";
import { envConfig } from "../config/env";

const Sessions = db.sessions;

const web = new WebClient(slackConfig.botToken!);

export const slackSessionStarted: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isNew) {
    logger.info("-------------------------------------------------------");
    logger.info("SENDING SLACK MESSAGE OF NEW SESSION");
    logger.info("-------------------------------------------------------");
    const ip = req.ip;
    const date = new Date().toLocaleString();
    const message = `${envConfig.env.toLocaleUpperCase()}: New session started on ${date} from IP Address: ${ip}.`;

    try {
      const result = await web.chat.postMessage({
        channel: slackConfig.channel!,
        text: message,
      });
      logger.info("Slack message sent: ", result.ts);
    } catch (error) {
      logger.error(error);
    }
  }
  next();
};

export const createSession: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("-------------------------------------------------------");
  logger.info("CREATING SESSION");
  logger.info("-------------------------------------------------------");
  const date = new Date();

  if (!req.session.sid) {
    req.session.sid = Date.now().toString();
    req.session.ipAddress = req.ip;
    req.session.userAgent = req.get("User-Agent")!;
    req.session.referer = req.get("Referer")!;
    req.session.expiresAt = new Date(
      Date.now() + authConfig.session.cookie.maxAge
    );
    req.session.startedAt = date;
    req.session.isNew = true;
  } else {
    req.session.isNew = false;
  }

  const sessionData: SessionCreationAttributes = {
    sid: req.session?.sid,
    user: req.session?.user?.user || undefined,
    email: req.session?.user?.email || undefined,
    role: req.session?.user?.role || undefined,
    ipAddress: req.session?.ipAddress,
    userAgent: req.session?.userAgent,
    referer: req.session?.referer,
    expiresAt: req.session?.expiresAt,
    isNew: req.session?.isNew,
    startedAt: req.session?.startedAt,
    endedAt: undefined,
  };

  if (req.session.isNew) {
    try {
      const message = `New session started on ${date} from IP Address: ${req.session.ipAddress}.`;
      logger.info(message);

      const newSession = await Sessions.create(sessionData);
      logger.info(`Session created: ${req.session.sid}`);
    } catch (error: any) {
      logger.error(error);
    }
  } else {
    try {
      const message = `Session updated on ${date} from IP Address: ${req.session.ipAddress}.`;
      logger.info(message);

      await Sessions.update(sessionData, { where: { sid: req.session.sid } });
      logger.info(`Session updated: ${req.session.sid}`);
    } catch (error: any) {
      logger.error(error);
    }
  }

  next();
};

export const endSession = async (
  req: Request,
  res: Response
): Promise<Response> => {
  logger.info("-------------------------------------------------------");
  logger.info("ENDING SESSION BY SID");
  logger.info("-------------------------------------------------------");

  try {
    const sid = req.params.sid;
    const date = new Date();

    const sessionData = {
      endedAt: date,
    };

    const session = await Sessions.update(sessionData, {
      where: { sid },
    });

    logger.info(`Session ended: ${sid}`);

    return res.send(session);
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send({
      message: error.message || "Error occurred while ending the session.",
    });
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
