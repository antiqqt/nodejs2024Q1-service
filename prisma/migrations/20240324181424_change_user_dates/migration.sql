/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ALTER COLUMN "version" SET DEFAULT 1,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" INTEGER NOT NULL;
