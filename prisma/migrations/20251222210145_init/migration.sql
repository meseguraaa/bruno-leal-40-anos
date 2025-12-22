-- CreateEnum
CREATE TYPE "GuestRole" AS ENUM ('HOLDER', 'GUEST');

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "holderName" TEXT NOT NULL,
    "holderPhone" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registrationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "GuestRole" NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Registration_createdAt_idx" ON "Registration"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_holderPhone_key" ON "Registration"("holderPhone");

-- CreateIndex
CREATE INDEX "Guest_registrationId_idx" ON "Guest"("registrationId");

-- CreateIndex
CREATE INDEX "Guest_role_idx" ON "Guest"("role");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
