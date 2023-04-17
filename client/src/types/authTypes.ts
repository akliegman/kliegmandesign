import React from "react";

export interface Session {
  cookie: string;
  expiresAt: string;
  ipAddress: string;
  sid: number;
  userAgent: string;
  isNew: boolean;
  user: User;
}

export interface User {
  user: string;
  role: string;
  email: string;
}

export type LoginProps = {
  user: string;
  password: string;
  email: string;
};
