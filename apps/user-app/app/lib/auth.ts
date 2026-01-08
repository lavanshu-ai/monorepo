import Credentials from "next-auth/providers/credentials"
import {prisma} from "@repo/db"
import bcrypt from "bcrypt"
 import type { Session } from "next-auth";
 import type { JWT } from "next-auth/jwt";
import { signIn } from "next-auth/react";

export const authOptions={
     providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                phone :{label:"Phone Number",type:"text",placeholder:"0123456789",required:true},
                password:{label:"Password",type:"text",placeholder:"*********",required:true}
            },
                  async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await prisma.user.findFirst({
                where: {
                    number: credentials.phone
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

            try {
                const user = await prisma.user.create({
                    data: {
                        number: credentials.phone.toString(),
                        password: hashedPassword,
                        email:"lv"
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
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