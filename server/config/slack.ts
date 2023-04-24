import * as dotenv from "dotenv";

dotenv.config();

interface SlackConfig {
  botToken: string;
  channel: string;
}

export const slackConfig = {
  botToken: process.env.SLACK_BOT_TOKEN!,
  channel: process.env.SLACK_CHANNEL_ID!,
};
