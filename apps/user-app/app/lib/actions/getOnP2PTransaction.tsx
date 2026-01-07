"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

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
    // interface t{
    //      amount:Number;
    //      Time:Date;
    // }[];
   return history.map((h)=>{
        if(h.fromUserId==userId){
           return { amount:-(h.amount),
                    Time:h.timeStamp}
        }else{
         return  { amount:h.amount,
            Time:h.timeStamp }
        }
    })
     
}