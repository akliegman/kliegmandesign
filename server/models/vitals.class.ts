import { Model } from "sequelize";
import { VitalCreationAttributes } from "./vitals.interface";

export class Vital
  extends Model<VitalCreationAttributes>
  implements VitalCreationAttributes
{
  public id!: number;
  public uuid!: string;
  public appSessionUuid!: string;
  public CLS!: number;
  public FID!: number;
  public LCP!: number;
  public TTFB!: number;
  public FCP!: number;
}
