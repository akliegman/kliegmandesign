import { Optional } from "sequelize";

export interface Session {
  id: number;
  sid: string;
  user?: string;
  email?: string;
  role?: string;
  ipAddress: string;
  userAgent: string;
  referer: string;
  expiresAt: Date;
  isNew: boolean;
  startedAt?: Date;
  endedAt?: Date;
}

export interface SessionCreationAttributes extends Optional<Session, "id"> {}
