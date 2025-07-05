/*
  Warnings:

  - You are about to drop the column `name` on the `line` table. All the data in the column will be lost.
  - Added the required column `subway_line_id` to the `line` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `line_name_key` ON `line`;

-- AlterTable
ALTER TABLE `line` DROP COLUMN `name`,
    ADD COLUMN `subway_line_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `line_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `line_type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `line` ADD CONSTRAINT `line_subway_line_id_fkey` FOREIGN KEY (`subway_line_id`) REFERENCES `line_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
