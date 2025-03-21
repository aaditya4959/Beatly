"use client"

import { useSession } from "next-auth/react"
//@ts-ignore
import { useRouter } from "next/navigation";   // Check why this has to be done manuallly?
import { useEffect } from "react";



// This component check that whether the user is logged in or not and redirects the pagge accordingly.

 export default function Redirect(){
     const { status } = useSession();
     const router = useRouter();

    useEffect(() => {
        if(status == "authenticated"){
            router.push("/dashboard");
        }
        else if(status == 'unauthenticated'){
            router.replace("/");
        }
    },[status, router])
    return null;
 }