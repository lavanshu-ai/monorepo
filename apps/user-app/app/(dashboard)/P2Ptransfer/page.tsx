import { getServerSession } from "next-auth"
import { P2pcard } from "../../../components/p2pcard"
import { redirect } from "next/navigation";
export default async function (){
  const session=await getServerSession();
   if(!session){
        redirect('/signIn')
      }
    return (<div className="min-h-screen w-screen grid place-items-center"> 
            <P2pcard/>
          </div>)
}