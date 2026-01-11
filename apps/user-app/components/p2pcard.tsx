"use client"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { Textinput } from "@repo/ui/Textinput"
import { Button } from "@repo/ui/button"
import P2psend from "../app/lib/actions/P2psend"
import { PhoneSchema } from "../app/schema/userSchema"
import { amountSchema } from "../app/schema/transferSchema"
export const P2pcard =()=>{
    const [amount,setAmount]=useState("");
    const [phone,setPhone]=useState("");
    const [problem,setProblem]=useState<Partial<Record<"phone" | "amount",string>>>({});
    const handelSend=async()=>{
        const fieldError:Record<string,string>={};
        const phoneCheck=PhoneSchema.safeParse({
            phone
        })
        const amountCheck=amountSchema.safeParse({
            amount
        })
          if(!phoneCheck.success){
            phoneCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string;
                fieldError[field]=issue.message
            })
          }
           if(!amountCheck.success){
            amountCheck.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string;
                fieldError[field]=issue.message
            })
          }
          if(phoneCheck.success && amountCheck.success){
              await P2psend(Number(amount),phone);
          }
          setProblem(fieldError)
        
    }
    return <div>
        <Card title="Send Money" >
            <div>
            <Textinput placeholder="Number" label="Phone No." error={problem.phone} onChange={(n)=>{
                setPhone(n)
            }}/>
            </div>
            <div>
            <Textinput placeholder="Amount" label="Amount" error={problem.amount} onChange={(a)=>{
                setAmount((a));
            }}/>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={async ()=>{
                   await handelSend()
                }}>Send</Button>
            </div>
        </Card>
    </div>
}