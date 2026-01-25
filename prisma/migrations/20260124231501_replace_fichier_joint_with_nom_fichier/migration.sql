/*
  Warnings:

  - You are about to drop the column `fichier_joint` on the `Courrier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courrier" DROP COLUMN "fichier_joint",
ADD COLUMN     "nom_fichier" TEXT;
