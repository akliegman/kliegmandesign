import { Model, DataTypes } from "sequelize";
import { SessionCreationAttributes } from "../types/sessions";
import { logger } from "../utils/logger";

export class Session
  extends Model<SessionCreationAttributes>
  implements SessionCreationAttributes
{
  public id!: number;
  public sid!: string;
  public user!: string;
  public email!: string;
  public role!: string;
  public ipAddress!: string;
  public userAgent!: string;
  public referer!: string;
  public expiresAt!: Date;
  public isNew!: boolean;
}

export function SessionsModel(sequelize: any): typeof Session {
  logger.info("Creating Sessions model...");

  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isNew: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "sessions",
    }
  );
  logger.info("Sessions model created.");
  return Session;
}
