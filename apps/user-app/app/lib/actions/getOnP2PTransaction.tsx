"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import { prisma } from "@repo/db";


async function getName(id:number){
    let u=await prisma.user.findFirst({
        where:{id:id}
    })
    return (u?.name)
}
export default async function UserTransactions(){
    const session=await getServerSession(authOptions);
    const userId=Number(session?.user.id)
    const history=await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {fromUserId:userId},
                {toUserId:userId}
            ]
            
        }
    })

   return history.map((h)=>{
        if(h.fromUserId==userId){
           return { amount:-(h.amount),
                    Time:h.timeStamp,
                   Provider: getName(h.toUserId)}
        }else{
         return  { amount:h.amount,
                   Time:h.timeStamp,
                   Provider: getName(h.fromUserId) }
        }
    })
     
}