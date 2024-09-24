import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth"
import prisma from "@/utils/db";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],

    callbacks:{
        async signIn(params){
            if(!params.user.email || !params.user.name){
                return false
            }

            const user = await prisma.user.findUnique({
                where:{
                    email:params.user.email
                }
            })

            if(!user){
                await prisma.user.create({
                    data:{
                        email:params.user.email,
                        name:params.user.name
                    }
                })
                return true;
            }

            return false;
        }
    }
})

export { handler as GET, handler as POST }
