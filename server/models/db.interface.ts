import { Sequelize } from "sequelize";
import { Session } from "./sessions.class";

export interface Db {
  sequelize: Sequelize;
  sessions: typeof Session;
}
