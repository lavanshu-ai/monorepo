-- CreateEnum
CREATE TYPE "onRampstatus" AS ENUM ('pending', 'failed', 'success');

-- CreateTable
CREATE TABLE "balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onRamping" (
    "id" SERIAL NOT NULL,
    "status" "onRampstatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "onRamping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "balance_userId_key" ON "balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "onRamping_token_key" ON "onRamping"("token");

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onRamping" ADD CONSTRAINT "onRamping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
