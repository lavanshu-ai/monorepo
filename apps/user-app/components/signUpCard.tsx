import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Textinput } from "@repo/ui/Textinput";
import Link from "next/link";
import { useRef, useState } from "react";
import CreateUser from "../app/lib/actions/createUser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { PhoneSchema,EmailSchema,NameSchema,PasswordSchema } from "../app/schema/userSchema";

export function SignUpCard(){
    const router=useRouter();
    const number=useRef("")
    const name=useRef("")
    const password=useRef("")
    const email=useRef("")
    const otp=useRef("")
     let [RequiredError,setRequiredError]=useState(
            {   nameReq:false,
                phoneReq:false,
                passReq:false,
                emailReq:false

            }
        )
    const handelPasswordChange=(e:string)=>{
       const eCheck=PasswordSchema.safeParse({
            password:e
        })
        if(!eCheck.success) {
            console.log("password req fail")
        }else{
            password.current=e;
        }
    }
    const handelPhoneChange=(e:string)=>{
        const eCheck=PhoneSchema.safeParse({
            phone:e
        })
        if(!eCheck.success) {
            console.log("phone req fail")
        }else{
                number.current=e;
           }
    }
    const handelNameChange=(e:string)=>{
       const eCheck=NameSchema.safeParse({
            name:e
        })
        if(!eCheck.success) {
            console.log("name req fail")
        }else{
            name.current=e;
        }
               
    } 
    const handelEmailChange=(e:string)=>{
        const eCheck=EmailSchema.safeParse({
            name:e
        })
        if(!eCheck.success) {
            console.log("email req fail")
        }else{
            email.current=e;
        }
    }
    const handelOtpChange=(e:string)=>{
        otp.current=e;
    }
    const handelSubmit=async ()=>{
        if(otp.current="2004"){
             setRequiredError({
            passReq:true,
            phoneReq:false,
            nameReq:false,
            emailReq:false
           })
            if (!number.current || !password.current || !name.current || !email.current) {
      setRequiredError({
        phoneReq: number.current ? false : true,
        passReq: password.current ? false : true,
        nameReq: name.current ? false : true,
        emailReq: email.current ? false : true,
       });
         return ; //########
         }
       const check=await CreateUser(name.current,email.current,number.current,password.current)
       if(check){
        const res=await signIn('credentials',{
            phone:number.current,
            password:password.current,
            redirect:false
        })
        if(!res?.error){
            router.push('/dashboard')
        }
       }}
    }
   
    
    return <div className="flex justify-center min-h-screen pt-16 bg-slate-400">
    <div className="w-full  max-w-md ">
        <Card title="Create Account">
        <Textinput placeholder="name" label="Full Name" onChange={(e)=>handelNameChange(e)} />
        <Textinput placeholder="0123456789" label="Phone no." onChange={(e)=>handelPhoneChange(e)} />
        <Textinput placeholder="********" label="Set password" onChange={(e)=>handelPasswordChange(e)} />
        <Textinput placeholder="eg-xyz@gmail.com" label="Email" onChange={(e)=>{handelEmailChange(e)}} />
        <Textinput placeholder="4-digit" label="OTP" onChange={(e)=>{handelOtpChange(e)}} />
         <div className="flex justify-center pt-3">
            <Button onClick={()=>{
                handelSubmit()
         }}>Submit</Button>
         </div> 
        {/* <div className="flex justify-center pt-3"> <Button onClick={()=>{

        }}> Verify Phone No.</Button>
        </div>
        <Textinput placeholder="eg-xyz@gmail.com" label="Email" onChange={()=>{

        }} />
        <div className="flex justify-center pt-3">
            <Button onClick={()=>{

         }}>Verify Email </Button>
         </div> */}
       
        <div className="text-sm text-slate-500  pt-6">Already a user?
            <Link className="text-slate-900 hover:text-green-600" href="/signIn"> Sign in</Link>
        </div>
         
        </Card>
    </div>
    </div>
}