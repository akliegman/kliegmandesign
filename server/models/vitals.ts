import { DataTypes } from "sequelize";
import { Vital } from "./vitals.class";
import { logger } from "../utils/logger";

export function VitalsModel(sequelize: any): typeof Vital {
  logger.info("Creating Vitals model...");

  Vital.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appSessionUuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CLS: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FID: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      LCP: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      TTFB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FCP: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "vitals",
    }
  );
  logger.info("Vitals model created.");
  return Vital;
}
