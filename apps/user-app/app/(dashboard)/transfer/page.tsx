import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { prisma } from "@repo/db"
import { AddMoney } from "../../../components/AddMoneycard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { redirect } from "next/navigation"

async function getBalance() {
    const session=await getServerSession(authOptions)

    const balance=await prisma.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    });
   // console.log(balance?.amount)
    return {
        amount:balance?.amount||0,
        locked:balance?.locked||0
    }
}
async function onRampingTransactions(){
    const session=await getServerSession(authOptions)
    if(!session){
      redirect('/signIn')
    }
    //console.log(session?.user.id)
    const txns=await prisma.onRamping.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return txns.map((t)=>(({
        Time:t.startTime,
        amount:t.amount,
        status:t.status,
        provider:t.provider
    })))
}

export default async function(){
    const transactions=await onRampingTransactions();
    const Balance=await getBalance();
    return(<div className="w-screen">
       <div className="text-4xl text-sky-800 pt-8 mb-8 font-bold">Transfer</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
           <AddMoney/>
        </div>
        <div>
            <BalanceCard amount={Balance.amount} locked={Balance.locked}/>
        </div>
        <div className="pt-4">
            <OnRampTransaction transactions={transactions}/>
        </div>
       </div>
        </div>)
}