import { Music2, Heart, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Music2 className="w-6 h-6 text-primary" />,
      title: "Seamless Integration",
      description: "Connect with popular streaming platforms in seconds.",
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Fan Engagement",
      description: "Increase viewer retention with interactive music selection.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Building",
      description: "Create shared musical experiences for your audience.",
    }
  ];

  return (
    <section id="features" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Interactive Streaming
          </h2>
          <p className="text-muted-foreground max-w-md">
            All the tools you need for engaging music experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
