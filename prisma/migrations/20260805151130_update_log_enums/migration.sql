/*
  Warnings:

  - The values [teste] on the enum `LOG_ACTIONS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "ENTITY_TYPES" ADD VALUE 'group';

-- AlterEnum
BEGIN;
CREATE TYPE "LOG_ACTIONS_new" AS ENUM ('creating', 'deleting', 'updating');
ALTER TABLE "Log" ALTER COLUMN "action" TYPE "LOG_ACTIONS_new" USING ("action"::text::"LOG_ACTIONS_new");
ALTER TYPE "LOG_ACTIONS" RENAME TO "LOG_ACTIONS_old";
ALTER TYPE "LOG_ACTIONS_new" RENAME TO "LOG_ACTIONS";
DROP TYPE "public"."LOG_ACTIONS_old";
COMMIT;
