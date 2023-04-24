import { DbInterface } from "../types/db";
import { PhotoCreationAttributes } from "../types/photos";
import { logger } from "../utils/logger";

export const photosSeed = (db: DbInterface) => {
  logger.info("Attempting to seed Photos table...");
  logger.info("Checking if db is connected...");
  if (!db) {
    logger.error("No db connection.");
    return;
  }

  logger.info("db connected.");
  const photosSeedData: PhotoCreationAttributes[] = [
    {
      name: "headshot.jpg",
      albumId: 1,
      imageUrl: "/seed/headshot.jpg",
      awsUrl: null,
      mimetype: "image/jpeg",
      published: true,
    },
    {
      name: "skyline.jpg",
      albumId: 1,
      imageUrl: "/seed/skyline.jpg",
      mimetype: "image/jpeg",
      awsUrl: null,
      published: true,
    },
  ];

  db.photos.findAll().then((data: PhotoCreationAttributes[]) => {
    if (data.length === 0) {
      logger.info("Photos table is empty. Seeding...");
      db.photos
        .bulkCreate(photosSeedData)
        .then(() => {
          logger.info("Seeded photos table.");
        })
        .catch((err: any) => {
          logger.error("Failed to seed photos table: " + err.message);
        });
    } else {
      logger.info("Photos table already seeded.");
    }
  });
};
