import { User } from "../types/user.types";

declare module "express-session" {
  export interface Session {
    sid: string;
    user: User;
    email: string;
    role: string;
    ipAddress: string;
    userAgent: string;
    referer: string;
    expiresAt: Date;
    isNew: boolean;
  }
}
