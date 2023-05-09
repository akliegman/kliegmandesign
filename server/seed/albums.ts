import { Db } from "../models/db.interface";
import { AlbumCreationAttributes } from "../models/albums.interface";
import { logger } from "../utils/logger";

export const albumsSeed: (db: Db) => void = (db: Db) => {
  logger.info("Attempting to seed Albums table...");
  logger.info("Checking if db is connected...");
  if (!db) {
    logger.error("No db connection.");
    return;
  }

  logger.info("db connected.");

  const albumsSeedData: AlbumCreationAttributes[] = [
    {
      name: "My First Album",
      albumId: 1,
      published: true,
    },
  ];

  db.albums.findAll().then((data: AlbumCreationAttributes[]) => {
    if (data.length === 0) {
      logger.info("Albums table is empty. Seeding...");
      db.albums
        .bulkCreate(albumsSeedData)
        .then(() => {
          logger.info("Seeded albums table.");
        })
        .catch((err: any) => {
          logger.error("Failed to seed albums table: " + err.message);
        });
    } else {
      logger.info("Albums table already seeded.");
    }
  });
};
