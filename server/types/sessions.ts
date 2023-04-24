import { Request } from "express";
import session from "express-session";

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

export type UserCredentials = {
  name: string;
  pass: string;
};

export type User = {
  user: string;
  email: string | null;
  role: string;
};

export interface Session {
  id: number;
  sid: string;
  user: string;
  email?: string;
  role: string;
  ipAddress: string;
  userAgent: string;
  referer: string;
  expiresAt: Date;
  isNew: boolean;
}
