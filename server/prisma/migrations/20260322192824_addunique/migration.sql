/*
  Warnings:

  - You are about to drop the `Diary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_diaryId_fkey";

-- DropTable
DROP TABLE "Diary";

-- DropTable
DROP TABLE "Meal";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
