"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

export default async function P2psend(amount: number,phone: string){
    const session=await getServerSession(authOptions);
    const userId=Number(session?.user.id);
    const amountPaise=amount *100;
    if(!userId){ 
        return {
        Msg:"your are not loggedIn"
    }}
    const receiver=await prisma.user.findFirst({
        where:{
            number:phone
        }
    })
    if(! receiver){
        return{
            msg:"Invalid Phone No."
        }
    } 
    const receiverId=receiver.id;
    
    try {
         await prisma.$transaction(async (tx)=>{
            await tx.$queryRaw`SELECT * FROM "balance" where "userId"=${userId} FOR UPDATE`
          

             const funds=await tx.balance.findFirst({
                where:{userId:userId}
            })
            if(!funds ||funds.amount <amountPaise){
                throw new Error("Insufficient funds")
            }
           await tx.balance.update({
                where:{
                    userId
                },
                 data:{
                        amount:{
                            decrement:amountPaise
                        }
                }
            })
           await tx.balance.upsert({
                where:{
                    userId:receiverId
                },
                 update:{
                        amount:{
                            increment:amountPaise
                        }
                },
                create:{userId:receiverId,amount:amountPaise,locked:0}
            })
            await tx.p2pTransfer.create({
                data:{
                    timeStamp:new Date(),
                    amount: amount,
                    fromUserId:userId,
                    toUserId:receiverId
                }
            })
        
        })
        console.log("money send")
}
    catch(e) {
        console.error(e)
        throw(e)
    }
}