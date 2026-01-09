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
    return <div className="flex justify-center pt-24">
           <div className="w-full max-w-sm">
         <Card title="SignIn"  >
        <div className="">
            <Textinput label="Phone no." placeholder="0123456789" onChange={(e)=>handelPhoneChange(e)}></Textinput> </div>
           <div>
            <Textinput label="Password" placeholder="********" onChange={(p)=>{handelPasswordChange(p)}}></Textinput></div> 
       
        <div className="flex justify-center pt-4">
            <Button onClick={()=>handelSubmit()
            }>Signin</Button>
        </div>
        <div className="text-sm text-slate-500 flex justify-center pt-6">New user? 
            <a className="text-slate-900 hover:text-blue-900" href="/signUp"> Register</a>
        </div>
    </Card></div>
    </div>
    }