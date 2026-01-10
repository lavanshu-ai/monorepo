import Credentials from "next-auth/providers/credentials"
import {prisma} from "@repo/db"
import bcrypt from "bcrypt"
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import {z} from "zod"
import type { User } from "next-auth";

const signInSchema=z.object({
    phone:z.string()
    .nonempty("Phone Number Required")
    .regex(/^[0-9]{10}$/,{message:"Enter a valid phone no."}),
    password:z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character")
})
type signInInput=z.infer<typeof signInSchema>
export const authOptions={
     providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                phone :{label:"Phone Number",type:"text",placeholder:"0123456789",required:true},
                password:{label:"Password",type:"text",placeholder:"*********",required:true}
            },
                  async authorize(credentials): Promise<User | null> {
                    if(!credentials) return null
                    const Input= signInSchema.safeParse({
                        phone:credentials.phone,
                        password:credentials.password
                    })
                    if(!Input.success){
                        return null
                    }
            const existingUser = await prisma.user.findFirst({
                where: {
                    number: Input.data?.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    console.log(existingUser)
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }
            return null
          },
         
        })
    ],
     secret :process.env.JWT_SECRET||"test",
      callbacks: {
        async session({ token, session }: {session:Session;
            token:JWT;
        }) {
            if (session.user && token.sub) {
             session.user.id = token.sub;
    }

            return session
        }
    },
    pages:{
        signIn:"/signIn"
    }
}