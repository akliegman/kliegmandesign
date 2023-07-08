import { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";
import { authConfig } from "../config/auth";
import { slackConfig } from "../config/slack";
import { envConfig } from "../config/env";
import { WebClient } from "@slack/web-api";
import { logger } from "../utils/logger";
import {
  credentialsExistTest,
  userCredentialsTest,
  adminCredentialsTest,
} from "../utils/auth";

const web = new WebClient(slackConfig.botToken!);

export const slackLoggedIn: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("-------------------------------------------------------");
  logger.info("SENDING SLACK MESSAGE OF NEW LOGIN");
  logger.info("-------------------------------------------------------");
  const email = req.session?.user?.email || "no email";
  const date = new Date().toLocaleString();
  const ip = req.ip;
  const message = `${envConfig.env.toLocaleUpperCase()}: New user logged in: ${email} on ${date} from IP Address: ${ip}.`;

  try {
    const result = await web.chat.postMessage({
      channel: slackConfig.channel!,
      text: message,
    });
    logger.info("Slack message sent: ", result.ts);
  } catch (error) {
    logger.error(error);
  }

  next();
};

export const authCheck: (req: Request, res: Response) => Response = (
  req: Request,
  res: Response
) => {
  logger.info("-------------------------------------------------------");
  logger.info("CHECKING AUTHORIZATION");
  logger.info("-------------------------------------------------------");

  if (req.session.user) {
    logger.info("User is authorized.");
    return res.status(200).send(req.session);
  }

  logger.info("User is unauthorized.");
  return res.status(200).send({ message: "Unauthorized" });
};

export const authLogin: (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | void = (req: Request, res: Response, next: NextFunction) => {
  logger.info("-------------------------------------------------------");
  logger.info("AUTHENTICATING USER");
  logger.info("-------------------------------------------------------");

  const user = basicAuth(req);

  const credentialsDontExistErrors: string | null = credentialsExistTest(user);
  const userCredentialsErrors: string | null = userCredentialsTest(user);
  const adminCredentialsErrors: string | null = adminCredentialsTest(user);

  if (credentialsDontExistErrors) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    logger.error(`Bad Request: ${credentialsDontExistErrors}`);
    return res.status(400).send(`Bad Request: ${credentialsDontExistErrors}`);
  }

  if (user?.name !== authConfig.adminUser && userCredentialsErrors) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    logger.error(`Bad Request: ${userCredentialsErrors}`);
    return res.status(400).send(`Bad Request: ${userCredentialsErrors}`);
  }

  if (user?.name === authConfig.adminUser && adminCredentialsErrors) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    logger.error(`Bad Request: ${adminCredentialsErrors}`);
    return res.status(400).send(`Bad Request: ${adminCredentialsErrors}`);
  }

  req.session.user = {
    user: user?.name!,
    email: req.query.email?.toString() || null,
    role: user?.name === authConfig.adminUser ? "admin" : "user",
  };

  logger.info(
    `Logged in: ${
      req.session.user.email || req.session.user.user
    } at ${new Date().toLocaleString()}`
  );

  next();
};

export const authLogout: (
  req: Request,
  res: Response
) => Promise<Response | void> = async (req: Request, res: Response) => {
  logger.info("-------------------------------------------------------");
  logger.info("LOGGING OUT USER");
  logger.info("-------------------------------------------------------");

  logger.info(
    `Logout: ${
      req.session?.user?.email || req.session?.user?.user
    } at ${new Date().toLocaleString()}`
  );
  try {
    await req.session.destroy((err) => {
      if (err) {
        const message = `Error: Could not log out: ${err.message}`;
        logger.error(message);
        return res.status(400).send(message);
      } else {
        logger.info("Logged out.");
        return res.status(200).send("Logged out");
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

export const requireAuth: (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | void = (req: Request, res: Response, next: NextFunction) => {
  logger.info("-------------------------------------------------------");
  logger.info("REQUIRING AUTHORIZATION");
  logger.info("-------------------------------------------------------");

  if (req.session.user) {
    logger.info("User is authorized.");
    return next();
  }
  logger.info("User is unauthorized.");
  return res.status(400).send({ message: "Unauthorized" });
};

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("-------------------------------------------------------");
  logger.info("REQUIRING ADMIN AUTHORIZATION");
  logger.info("-------------------------------------------------------");

  if (req.session.user && req.session.user.role === "admin") {
    logger.info("User is authorized.");
    return next();
  }

  logger.info("User is unauthorized.");
  return res.status(400).send({ message: "Unauthorized" });
};
