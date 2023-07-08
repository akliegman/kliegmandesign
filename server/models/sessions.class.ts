import { Model } from "sequelize";
import { SessionCreationAttributes } from "./sessions.interface";

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
  public startedAt!: Date;
  public endedAt!: Date;
}
