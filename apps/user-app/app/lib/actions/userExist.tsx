"use server"
import { prisma } from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
type UserCheckResult =
    | { status: "not_found" }
    | { status: "same_user" }
    | { status: "ok" }

export const UserExist = async (phone: string): Promise<UserCheckResult> => {
    const session = await getServerSession(authOptions)
    const id = session?.user.email
    if (id == phone) {
        return { status: "same_user" }
    }
    const user = await prisma.user.findFirst({
        where: {
            number: phone
        }
    })
    if (user?.number) return { status: "ok" }
    return { status: "not_found" }
}