/*
  Warnings:

  - Added the required column `name` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "statement" DROP NOT NULL;
