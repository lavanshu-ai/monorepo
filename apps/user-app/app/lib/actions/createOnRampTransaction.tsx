"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";


export default async function OnRampTransaction(amount:Number,provider:string){
     const session= await getServerSession(authOptions);
     const token= (Math.random()).toString();
     const userId=session?.user.id;
     if(!userId){
        return{
            msg:"you are not logged In",
        }
     }
     const Money=Number(amount)*100;
                await prisma.onRamping.create({
                    data:{
                    userId:Number(userId),
                    amount:Money,
                    startTime: new Date(),
                    provider,
                    status:"pending",
                    token:token
                    }
                })
                return {
                    msg:"OnRamp Transation added"
                }
}