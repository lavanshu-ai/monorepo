"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { Textinput } from "@repo/ui/Textinput";
import { useState } from "react"
import OnRampTransaction from "../app/lib/actions/createOnRampTransaction";


const SUPPORTED_BANKS=[{
  name:'HDFC Bank',
  redirectUrl:"https://netbanking.hdfcbank.com/netbanking/"
},{
  name:'Axis Bank',
  redirectUrl:"https://www.axisbank.com/"
},{
    name:"Bank of India",
    redirectUrl:"https://bankofindia.bank.in/"
}]

export const AddMoney=  ()=>{
    const [redirectUrl,setRedirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl);
   const [amount,setAmount]=useState(0);
   const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name||"");

    return(<div>
        <Card title="AddMoney" >
        <div className="w-full">
        <Textinput label="Amount" placeholder="Amount" onChange={ (e)=>{ 
            setAmount(Number(e))
        }}/>
        <div className="py-4 text-left">Bank</div>
        <Select onSelect={(input)=>{ 
            console.log(input) // print
            setProvider(input);
            setRedirectUrl(SUPPORTED_BANKS.find((x)=>{return x.name===input})?.redirectUrl||"")}}
        options={SUPPORTED_BANKS.map(x=>
            ({
                key:x.name,
                value:x.name
            })
        )}/>
        <div className="flex justify-center pt-4">
            <Button onClick={ async ()=>{  
                await OnRampTransaction(amount,provider);
                window.location.href=redirectUrl||"";
                console.log(redirectUrl) // print
             }}>Add Money</Button>
        </div>
        </div>
        </Card>
    </div>)
}