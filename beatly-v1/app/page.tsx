
import Image from "next/image";
import Appbar from "./Components/Appbar";
import { SessionProvider } from "next-auth/react";
import {getServerSession} from "next-auth";

export default function Home() {
  return (
    
      <Appbar/>
    
    
  );
}
