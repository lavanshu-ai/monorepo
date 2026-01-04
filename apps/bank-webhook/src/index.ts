import express from "express"
import {prisma} from "@repo/db"
const app=express();

app.use(express.json())

app.post("/hdfcWebhook",async (req,res)=>{
    const paymentInfo :{
        token:string;
        userid:string;
        amount:string;

    }={
        token:req.body.token,
        userid:req.body.user_identifier,
        amount:req.body.amount
    }
    const payment=await prisma.onRamping.findFirst({
        where:{
            token:paymentInfo.token
        }
    })
      if(!payment || payment.status !="pending") {
        return res.status(400).json({
            msg:"No active Transaction found"
        })
      } 

    try {
        await prisma.$transaction([
           prisma.balance.update({
            where:{
                userId:Number(paymentInfo.userid)
            },
            data:{
                amount:{
                    increment:Number(paymentInfo.amount)
                }
            }
          }),
           prisma.onRamping.update({
            where:{
                token:paymentInfo.token
            },
            data:{
                status:"success"
            }
          })
        ]);
         res.json({
            message: "Captured"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})
app.listen(3003,()=>{
    console.log("server is running")
})