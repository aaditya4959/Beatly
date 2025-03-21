"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Hero = () => {
  const [waveData, setWaveData] = useState<{ height: number; speed: string }[]>([]);

  useEffect(() => {
    // Generate stable wave heights & speeds only on the client
    setWaveData(
      Array.from({ length: 12 }, () => ({
        height: 20 + Math.random() * 30, // Random height between 20px and 50px
        speed: `${1 + Math.random() * 0.5}s`, // Random animation speed between 1s and 1.5s
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center">
      {/* Background effect */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/10 filter blur-[150px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            Let Your <span className="text-primary">Audience</span> Choose The Beat
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Interactive music selection for your streams. Let your audience vote on what plays next.
          </p>

          {/* CTA Button */}
          <Button size="lg" className="gap-2 px-8 mb-16">
            <Play size={18} />
            Start Streaming
          </Button>

          {/* Key Stat */}
          <div className="glass-card p-6 rounded-xl w-full max-w-xs">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold">5,000+</h3>
              <p className="text-muted-foreground text-sm">Active Streamers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add this Tailwind keyframe animation */}
      <style>
        {`
          @keyframes waveMove {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(1.5); }
            100% { transform: scaleY(1); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
