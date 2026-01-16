import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const users = [
  {
    name: "lv",
    number: "9406645283",
    email: "lavanshupatidar@gmail.com",
    password: "lv",
    balance:{
      amount:2000000,
      locked:80000
    },
    onRamp: {
      status: "success",
      amount: 20000,
      token: "2004",
      provider: "HDFC Bank",
    },
  },
  {
    name: "Rahul",
    number: "9123456789",
    email: "rahul@test.com",
    password: "rahul123",
     balance:{
      amount:2000000,
      locked:80000
    },
    onRamp: {
      status: "pending",
      amount: 5000,
      token: "3001",
      provider: "ICICI Bank",
    },
  },
  {
    name: "Ankit",
    number: "9876543210",
    email: "ankit@test.com",
    password: "ankit123",
     balance:{
      amount:2000000,
      locked:80000
    },
    onRamp: {
      status: "failed",
      amount: 10000,
      token: "4002",
      provider: "SBI",
    },
  },
];

async function main() {
  for (const user of users) {
    const pass=await bcrypt.hash(user.password,10)
    await prisma.user.upsert({
      where: { number: user.number }, 
      update: {},
      create: {
        name: user.name,
        number: user.number,
        email: user.email,
        password: pass,
        balance:{
          create:{ 
            amount:(user.balance?.amount)||0,
            locked:(user.balance?.locked)||0
          }
         
        },
        onRamping: {
          create: {
            startTime: new Date(),
            status: "success",
            amount: user.onRamp.amount,
            token: user.onRamp.token,
            provider: user.onRamp.provider,
          },
        },
      },
    });
  }

  console.log("Dummy users seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
