import Credentials from "next-auth/providers/credentials"
import {prisma} from "@repo/db"
import bcrypt from "bcrypt"
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";


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
                    
            const existingUser = await prisma.user.findFirst({
                where: {
                    number:credentials.phone
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