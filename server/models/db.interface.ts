import { Sequelize } from "sequelize";
import { Photo } from "./photos.class";
import { Session } from "./sessions.class";

export interface Db {
  sequelize: Sequelize;
  photos: typeof Photo;
  sessions: typeof Session;
}
