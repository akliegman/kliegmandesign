import { Optional } from "sequelize";

export interface Vital {
  id: number;
  uuid: string;
  appSessionUuid: string;
  CLS: number;
  FID: number;
  LCP: number;
  TTFB: number;
  FCP: number;
}

export interface VitalCreationAttributes extends Optional<Vital, "id"> {}
