import { CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Set Up Your Stream",
      description: "Connect Beatly to your streaming platform in minutes.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Add Your Music",
      description: "Upload songs or connect to existing music platforms.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "Let Fans Vote",
      description: "Audience chooses what plays next, creating engagement.",
      image: "https://images.unsplash.com/photo-1557787163-1635e2efb160?q=80&w=2073&auto=format&fit=crop",
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-md">
            Three simple steps to get started.
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-1/2 text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>Simple, intuitive setup</span>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] glass-card p-1">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
