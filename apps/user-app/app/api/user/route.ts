import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { NextResponse } from "next/server";


export  async function GET (){
 const session = await getServerSession(authOptions);
   if(session?.user){
      return NextResponse.json({
        user: session.user
      })
   }
   return NextResponse.json({
       msg: "You are not LoggedIn"
   },{status:403})

}