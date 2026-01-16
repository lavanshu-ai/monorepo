"use client"
import { Card } from "@repo/ui/card"
import { useRef, useState } from "react"
import { Textinput } from "@repo/ui/Textinput"
import { Button } from "@repo/ui/button"
import P2psend from "../app/lib/actions/P2psend"
import { PhoneSchema } from "../app/schema/userSchema"
import { amountSchema } from "../app/schema/transferSchema"
import { UserExist } from "../app/lib/actions/userExist"
export const P2pcard = () => {
  const amount = useRef("");
  const phone = useRef("");
  const [problem, setProblem] = useState<Partial<Record<"phone" | "amount", string>>>({});
  const [success, setSuccess] = useState("")
  const handelSend = async () => {

    const fieldError: Record<string, string> = {};
    const phoneCheck = PhoneSchema.safeParse({
      phone: phone.current
    })
    const amountCheck = amountSchema.safeParse({
      amount: amount.current
    })
    if (!phoneCheck.success) {
      phoneCheck.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldError[field] = issue.message
      })
    }

    if (!amountCheck.success) {
      amountCheck.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldError[field] = issue.message
      })
    }
    if (!phoneCheck.success || !amountCheck.success) {
      setProblem(fieldError)
      return
    }

    const userCheck = await UserExist(phone.current)
    if (userCheck.status == "same_user") {
      setProblem({ phone: "Self transfer not allowed" })
      return
    }
    if (userCheck.status == "not_found") {
      setProblem({ phone: "No existing user found" })
      return
    }

    await P2psend(Number(amount.current), phone.current);
    phone.current = ""
    setSuccess("sent")
  }

  return <div className="flex justify-center">
    <div className="w-full max-w-md">
      <Card title="Send Money" >
        <div>
          <Textinput placeholder="Number" label="Phone No." error={problem.phone} onChange={(n) => {
            phone.current = (n)
          }} />
        </div>
        <div>
          <Textinput placeholder="Amount" label="Amount" error={problem.amount} onChange={(a) => {
            amount.current = ((a));
          }} />
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <Button onClick={async () => {
            await handelSend()
          }}>Send</Button>
          {success && (<div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              ✓
            </div>

            <div>
              <p className="font-semibold text-green-700">
                Payment Successful
              </p>
              <p className="text-sm text-green-600">
                Your money has been transferred successfully.
              </p>

            </div>
          </div>)}
        </div>
      </Card>
    </div>
  </div>
}