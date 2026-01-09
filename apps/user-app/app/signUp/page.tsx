"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Textinput } from "@repo/ui/Textinput";

export default function signUp(){
    return <div className="flex justify-center  pt-24 bg-slate-400">
    <div className="w-full  max-w-md ">
        <Card title="Create Account">
        <Textinput placeholder="name" label="Full Name" onChange={()=>{

        }} />
         <Textinput placeholder="eg-xyz@gmail.com" label="Email" onChange={()=>{

        }} />
        <div className="flex justify-center pt-3">
            <Button onClick={()=>{

         }}>Verify Email </Button>
         </div>
         <Textinput placeholder="0123456789" label="Phone no." onChange={()=>{

        }} />
        <div className="flex justify-center pt-3"> <Button onClick={()=>{

        }}> Verify Phone No.</Button>
        </div>
        
         
        </Card>
    </div>
    </div>
}