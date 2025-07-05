/*
  Warnings:

  - Added the required column `code` to the `subway_station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subway_station` ADD COLUMN `code` INTEGER NOT NULL;
