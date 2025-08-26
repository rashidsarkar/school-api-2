/*
  Warnings:

  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "name";

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
