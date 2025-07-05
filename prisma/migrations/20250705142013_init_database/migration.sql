/*
  Warnings:

  - You are about to drop the column `status` on the `facility` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `facility` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `facility` DROP COLUMN `status`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `subway_station_facility` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
