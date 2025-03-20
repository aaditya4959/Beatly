import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/app/lib/db";




const authHandler = NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks:{
        async signIn(params){

            if(!params.user.email){
                return false;
            }
            try{

                await prisma.user.create({
                    data:{
                        email: await params.user.email,
                        //@ts-ignore
                        provider:"Github"
                    }
                    
                })
            }catch(err: any){
                console.log(`Error in Sign In: ${err.message}`);
            }
            

            return true;
        }
    }
})


export {authHandler as GET, authHandler as POST}