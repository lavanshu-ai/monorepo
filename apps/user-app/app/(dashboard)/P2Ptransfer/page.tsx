import { getServerSession } from "next-auth"
import { P2pcard } from "../../../components/p2pcard"
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
export default async function (){
  const session=await getServerSession(authOptions);
   if(!session){
        redirect('/signIn')
      }
    return ( <div className="pt-32 w-full">
      <div className="flex justify-center">
        <div className="w-full max-w-xl px-6">
          <P2pcard />
        </div>
      </div>
    </div>)
}