import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Utensils, Brain, Activity, Star, User } from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: Heart,
      title: "Pain Relief",
      description: "AI-powered pain tracking and personalized relief recommendations",
      color: "text-tertiary"
    },
    {
      icon: Shield,
      title: "Sleep Shield",
      description: "Optimize your sleep patterns with intelligent monitoring",
      color: "text-primary"
    },
    {
      icon: Utensils,
      title: "Nutrition Support",
      description: "Smart nutrition insights tailored to your body's needs",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "AI companion for emotional support and mental health tracking",
      color: "text-tertiary"
    },
    {
      icon: Activity,
      title: "Early Detection",
      description: "Proactive health monitoring with predictive wellness insights",
      color: "text-primary"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Enthusiast",
      content: "Sync'd has transformed how I understand my body. The AI insights are incredibly accurate.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Chronic Pain Sufferer",
      content: "Finally, an app that truly gets it. The pain tracking and recommendations have been life-changing.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Sleep Specialist",
      content: "The sleep tracking capabilities are remarkably sophisticated. I recommend it to all my patients.",
      rating: 5
    }
  ];

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-tertiary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            {/* Hero Content */}
            <div className="lg:w-1/2 text-center lg:text-left animate-fade-in">
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 font-poppins">
                <span className="gradient-text">Sync'd</span>
              </h1>
              <p className="text-2xl lg:text-3xl mb-4 text-muted-foreground font-light">
                In sync with your body
              </p>
              <p className="text-xl mb-8 text-foreground/80 max-w-lg">
                AI-powered wellness companion for pain, sleep, nutrition, and mental health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
                <Button variant="ghost" size="lg" className="text-lg px-8 py-6" onClick={scrollToFeatures}>
                  Learn More
                </Button>
              </div>
            </div>

            {/* Futuristic Body Visualization */}
            <div className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Body Silhouette */}
                <div className="w-64 h-96 relative">
                  <svg viewBox="0 0 200 300" className="w-full h-full">
                    <defs>
                      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(var(--tertiary))" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Human silhouette */}
                    <path
                      d="M100 20 C110 20 120 30 120 40 C120 50 110 60 100 60 C90 60 80 50 80 40 C80 30 90 20 100 20 Z M100 60 L90 80 L90 150 L85 200 L85 250 L90 280 L110 280 L115 250 L115 200 L110 150 L110 80 Z M90 80 L70 100 L65 130 L70 160 L90 150 M110 80 L130 100 L135 130 L130 160 L110 150"
                      fill="url(#bodyGradient)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="animate-glow-pulse"
                    />
                  </svg>
                </div>

                {/* AI Waveforms */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                </div>

                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                  <div className="ai-wave"></div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full" style={{ background: 'var(--gradient-glow)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
              <span className="gradient-text">Wellness Redefined</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of personal health with AI-powered insights that adapt to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="glass interactive group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-glass to-glass/50 flex items-center justify-center group-hover:animate-glow-pulse`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
              <span className="gradient-text">Trusted by Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real people, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="glass interactive"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/80 py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4 font-poppins">Sync'd</h3>
              <p className="text-muted-foreground">
                Your AI-powered wellness companion for a healthier tomorrow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">About</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Science</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Privacy</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Data Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Sync'd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;