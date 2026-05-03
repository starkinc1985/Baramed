-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ADMINISTRATOR';
