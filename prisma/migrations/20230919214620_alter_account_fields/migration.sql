/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `Account` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "deletedAt",
DROP COLUMN "isAdmin",
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "userType" INTEGER NOT NULL;
