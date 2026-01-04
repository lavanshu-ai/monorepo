"use client"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { Textinput } from "@repo/ui/Textinput"
import { Button } from "@repo/ui/button"
import P2psend from "../app/lib/actions/P2psend"
export const P2pcard =()=>{
    const [amount,setAmount]=useState(0);
    const [phone,setPhone]=useState("");

    return <div>
        <Card title="Peer to Peer Transfer">
            <div>
            <Textinput placeholder="Number" label="Peer Phone No." onChange={(n)=>{
                setPhone(n)
            }}/>
            </div>
            <div>
            <Textinput placeholder="Amount" label="Amount" onChange={(a)=>{
                setAmount(Number(a));
            }}/>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={async ()=>{
                 await P2psend(amount,phone);
                }}>Send</Button>
            </div>
        </Card>
    </div>
}