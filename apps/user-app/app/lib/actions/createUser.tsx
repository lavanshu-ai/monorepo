'use server'

import { prisma } from "@repo/db"
import bcrypt from "bcrypt"
export default async function CreateUser(name:string,email:string,phone:string,password:string){

    const hashedPassword=await bcrypt.hash(password,10);

  await prisma.user.create({
    data:{
        name,
        email,
        number:phone,
        password:hashedPassword,
       
    }
  })
  const uid=await prisma.user.findFirst({
    where:{
      number:phone
    }
  });
  if (!uid) return false
  await prisma.balance.create({
    data :{
      amount:0,
      locked:0,
      userId:uid.id
    }
  })
  console.log("user created")
  return true
}