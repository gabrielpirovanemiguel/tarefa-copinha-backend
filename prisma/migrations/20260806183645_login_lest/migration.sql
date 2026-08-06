/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_admin_id_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "admin_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
