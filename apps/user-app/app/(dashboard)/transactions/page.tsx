import { getServerSession } from "next-auth";
import { TransactionsCard } from "../../../components/TransactionsCard";
import { redirect } from "next/navigation";

export default async function(){
    const session=await getServerSession();
       if(!session){
            redirect('/signIn')
          }
    return(<div className="w-full pr-4 pt-4">
       <TransactionsCard/>
        </div>)
}