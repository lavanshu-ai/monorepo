import { Card } from "@repo/ui/card";

type Status = "pending"|"failed"|"success";

export const OnRampTransaction=({transactions}:{
    transactions:{
        Time:Date;
        amount:Number;
        status:Status;
        provider:String;
    }[]
})=>{
    if(!transactions.length){
        return <Card title="Recent transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>

    }
    return <Card title="Recent transactions">
            <div className="pt-8">
               {transactions.map((t)=> <div className="flex justify-between">
                <div className="text-sm"> 
                    Received INR
                </div>
                <div className="text-slate-600 text-sm">
                    {t.Time.toDateString()}
                </div>
                <div className="flex flex-col justify-center">
                    +RS {Number(t.amount)/100}
                </div>
               </div>  )}
            </div>
        </Card>
}