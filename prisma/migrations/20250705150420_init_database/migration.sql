/*
  Warnings:

  - You are about to drop the column `status` on the `subway_station_facility` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subway_station_facility` DROP COLUMN `status`,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0;
