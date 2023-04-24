import { Sequelize } from "sequelize";
import { Photo } from "../models/photos";
import { Session } from "../models/sessions";

export interface DbInterface {
  sequelize: Sequelize;
  photos: typeof Photo;
  sessions: typeof Session;
}
