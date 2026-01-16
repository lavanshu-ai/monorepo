import getOnP2PTransaction from "../app/lib/actions/getOnP2PTransaction"
import { Card } from "@repo/ui/card";
import {prisma} from"@repo/db";
export const TransactionsCard=async ()=>{
    const transfers=await getOnP2PTransaction();
     if(!transfers.length){
            return <Card title="Recent transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent Transactions
                </div>
            </Card>
    
        }
        return <Card title=" Transactions History">
                <div className="pt-6 divide-y divide-slate-200 ">
                   {transfers.map((t)=> <div key={Math.random()} className="grid grid-cols-3 gap-3 w-full items-center pt-3">
                    <div className="font-semibold"> 
                       {t.amount>0?"Received from ":"Paid to "}{t.Provider}
                    </div>
                    <div className="text-slate-600 text-sm">
                        {t.Time.toDateString()}
                    </div>
                    <div className="text-right font-medium">
                        ₹ {Math.abs(t.amount)}
                    </div>
                   </div>  )}
                </div>
            </Card>
}
// ####  optional way  #####
// async function GetName({id}:{id:number}){
//     let u=await prisma.user.findFirst({
//         where:{id:id}
//     })
//     return (u?.name)
// }