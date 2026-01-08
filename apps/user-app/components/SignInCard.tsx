import { Card } from "@repo/ui/card"
import { Textinput } from "@repo/ui/Textinput";
import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
export const SignInCard=()=>{
    const router =useRouter();
    const [RequiredError,setRequiredError]=useState(
        {
            phoneReq:false,
            passReq:false
        }
    )
    const phone=useRef("")
    const password=useRef("")
    const handelPhoneChange = (e: string)=>{
        phone.current=e
        // const phoneNumberRegex = /^[0-9]{10}$/; will be added 
      }
    const handelPasswordChange=(p: string)=>{
        password.current=p
    }
    const handelSubmit=async (e?: React.FormEvent<HTMLButtonElement>)=>{
         if(e) e.preventDefault() ;
         if (!phone.current || !password.current) {
      setRequiredError({
        phoneReq: phone.current ? false : true,
        passReq: password.current ? false : true,
       });
         return ;
         }
        const res=await signIn('credentials',{
            phone:phone.current,
            password:password.current,
            redirect:false
        })
        if(!res?.error){
            router.push('/dashboard')
        }
     
     }
    return <Card title="SignIn">
        <div>
            <Textinput label="Pnone No." placeholder="0123456789" onChange={(e)=>handelPhoneChange(e)}></Textinput>
            <Textinput label="Password" placeholder="********" onChange={(p)=>{handelPasswordChange(p)}}></Textinput>
        </div>
        <div>
            <Button onClick={()=>handelSubmit()
            }>Signin</Button>
        </div>
    </Card>
}