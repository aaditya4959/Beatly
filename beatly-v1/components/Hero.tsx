import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center">
      {/* Simplified background effect - just one subtle gradient */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/10 filter blur-[150px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Main Heading - simplified */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            Let Your <span className="text-primary">Audience</span> Choose The Beat
          </h1>

          {/* Description - more concise */}
          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Interactive music selection for your streams. Let your audience vote on what plays next.
          </p>

          {/* CTA Buttons - reduced to one primary action */}
          <Button size="lg" className="gap-2 px-8 mb-16">
            <Play size={18} />
            Start Streaming
          </Button>

          {/* Simplified waveform */}
          <div className="waveform mb-16">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="wave-bar"
                style={{
                  '--i': i,
                  '--speed': `${1 + Math.random() * 0.5}s`,
                  height: `${20 + Math.random() * 30}px`
                } as React.CSSProperties}
              ></div>
            ))}
          </div>

          {/* Simplified metrics - just one key stat */}
          <div className="glass-card p-6 rounded-xl w-full max-w-xs">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold">5,000+</h3>
              <p className="text-muted-foreground text-sm">Active Streamers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
