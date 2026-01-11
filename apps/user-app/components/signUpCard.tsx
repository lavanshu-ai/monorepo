import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Textinput } from "@repo/ui/Textinput";
import Link from "next/link";
import { useRef, useState } from "react";
import CreateUser from "../app/lib/actions/createUser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { PhoneSchema,EmailSchema,NameSchema,PasswordSchema,otpSchema} from "../app/schema/userSchema";

export function SignUpCard(){
    const router=useRouter();
    const number=useRef("")
    const name=useRef("")
    const password=useRef("")
    const email=useRef("")
    const otp=useRef("")
     let [RequiredError,setRequiredError]=useState<Partial<Record<"phone" |"password" |"email"|"name" | "otp",string>>>({})
    const handelPasswordChange=(e:string)=>{
            password.current=e;
    }
    const handelPhoneChange=(e:string)=>{
            number.current=e;  
    }
    const handelNameChange=(e:string)=>{
            name.current=e;  
    } 
    const handelEmailChange=(e:string)=>{  
            email.current=e;
    }
    const handelOtpChange=(e:string)=>{
            otp.current=e;
    }

    const handelSubmit=async ()=>{
        const fieldserror:Record<string,string>={};
         const eCheck=EmailSchema.safeParse({
            email:email.current
         })  
         if(!eCheck.success){
               eCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                fieldserror[field]=issue.message
            })
         }   
         const nCheck=NameSchema.safeParse({
            name:name.current
         })
         if(!nCheck.success){
               nCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                fieldserror[field]=issue.message
            })
        }
         const phCheck=PhoneSchema.safeParse({
            phone:number.current
         })
          if(!phCheck.success){
               phCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                fieldserror[field]=issue.message
            })
        }
         const pCheck=PasswordSchema.safeParse({
            password:password.current
         })
          if(!pCheck.success){
               pCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                fieldserror[field]=issue.message
            })
          } 
          const oCheck=otpSchema.safeParse({
            otp:otp.current
          })
          if(!oCheck.success){
               oCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                fieldserror[field]=issue.message
            })
          }
    if(pCheck.success && nCheck.success && phCheck.success && eCheck.success && oCheck.success){
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
            }
       }
       setRequiredError(fieldserror)
    }
   
    
    return <div className="flex justify-center min-h-screen pt-16 bg-slate-400">
    <div className="w-full  max-w-md ">
        <Card title="Create Account">
        <Textinput placeholder="name" label="Full Name" error={RequiredError.name} onChange={(e)=>handelNameChange(e)} />
        <Textinput placeholder="0123456789" label="Phone no." error={RequiredError.phone} onChange={(e)=>handelPhoneChange(e)} />
        <Textinput placeholder="********" label="Set password" error={RequiredError.password} onChange={(e)=>handelPasswordChange(e)} />
        <Textinput placeholder="eg-xyz@gmail.com" label="Email" error={RequiredError.email} onChange={(e)=>{handelEmailChange(e)}} />
        <Textinput placeholder="4-digit" label="OTP" error={RequiredError.otp} onChange={(e)=>{handelOtpChange(e)}} />
         <div className="flex justify-center pt-3">
            <Button onClick={()=>{
                handelSubmit()
         }}>Submit</Button>
         </div> 
        {/* <div className="flex justify-center pt-3"> <Button onClick={()=>{

        }}> Verify Phone No.</Button>
        </div>
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