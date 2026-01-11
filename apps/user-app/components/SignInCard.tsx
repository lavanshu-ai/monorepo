import { Card } from "@repo/ui/card"
import { Textinput } from "@repo/ui/Textinput";
import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PhoneSchema } from "../app/schema/userSchema";

export const SignInCard=()=>{
    const router =useRouter();
    const [RequiredError,setRequiredError]=useState('')
    const phone=useRef("")
    const password=useRef("")

    const handelPhoneChange = (e: string)=>{
              phone.current=e;    
      }
    const handelPasswordChange=(p: string)=>{
        password.current=p
    }
    const handelSubmit=async (e?: React.FormEvent<HTMLButtonElement>)=>{
         if(e) e.preventDefault() ;
        const phoneCheck=PhoneSchema.safeParse({
            phone:phone.current
        })
         if(!phoneCheck.success) {
           phoneCheck.error.issues.forEach((issue)=>{
            setRequiredError(issue.message)
           })
        }else{
        const res=await signIn('credentials',{
            phone:phone.current,
            password:password.current,
            redirect:false
        })
        if(!res?.error){
            router.push('/dashboard')
        }}
     
     }
    return <div className="flex justify-center pt-24 min-h-screen bg-slate-400">
           <div className="w-full max-w-sm">
         <Card title="Sign In"  >
        <div className="">
            <Textinput label="Phone no." placeholder="0123456789" error={RequiredError} onChange={(e)=>handelPhoneChange(e)}></Textinput> </div>
           <div>
            <Textinput label="Password" placeholder="********" onChange={(p)=>{handelPasswordChange(p)}}></Textinput></div> 
       
        <div className="flex justify-center pt-4">
            <Button onClick={()=>handelSubmit()
            }>Signin</Button>
        </div>
        <div className="text-sm text-slate-500  pt-6">Don’t have an account? 
            <Link className="text-slate-900 hover:text-green-600" href="/signUp"> Sign up</Link>
        </div>
    </Card></div>
    </div>
    }