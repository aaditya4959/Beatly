import Features from "@/components/Features";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Redirect from "@/components/Redirect";



export default function Home() {
  return (
    <div> 
      <Redirect/>
      <Hero/>
      <Features/>
      <HowItWorks/>
    </div>
    
      
    
    
  );
}
