"use client"

import { useSession } from "next-auth/react"
//@ts-ignore
import { useRouter } from "next/navigation";   // Check why this has to be done manuallly?
import { useEffect } from "react";



// This component check that whether the user is logged in or not and redirects the pagge accordingly.

 export default function Redirect(){
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session.status == "authenticated"){
            router.push("/dashboard");
        }
    },[session])
    return null;
 }