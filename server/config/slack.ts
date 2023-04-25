import * as dotenv from "dotenv";
import { SlackConfig } from "../types/config";

dotenv.config();

export const slackConfig: SlackConfig = {
  botToken: process.env.SLACK_BOT_TOKEN!,
  channel: process.env.SLACK_CHANNEL_ID!,
};
