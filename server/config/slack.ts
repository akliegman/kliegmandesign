import * as dotenv from "dotenv";
import { SlackConfig } from "./slack.interface";

dotenv.config();

export const slackConfig: SlackConfig = {
  botToken: process.env.SLACK_BOT_TOKEN!,
  channel: process.env.SLACK_CHANNEL_ID!,
};
