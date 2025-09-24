import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Utensils, Brain, Activity, Star, User, ChevronLeft, ChevronRight, MessageSquare, Users, Zap } from "lucide-react";
import { ScrollReveal, FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "./ScrollAnimations";
import { motion } from "framer-motion";
import { useState } from "react";

const EnhancedLandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Heart,
      title: "Pain Relief",
      description: "AI-powered pain tracking with interactive body mapping and personalized relief recommendations",
      color: "text-tertiary",
      badge: "Smart Tracking"
    },
    {
      icon: Shield,
      title: "Sleep Shield",
      description: "Optimize your sleep patterns with intelligent monitoring and environmental insights",
      color: "text-primary",
      badge: "24/7 Monitoring"
    },
    {
      icon: Utensils,
      title: "Nutrition Support",
      description: "Smart nutrition insights tailored to your body's needs with meal planning assistance",
      color: "text-secondary",
      badge: "Personalized"
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "AI companion for emotional support, mood tracking, and mental health guidance",
      color: "text-tertiary",
      badge: "AI Companion"
    },
    {
      icon: Activity,
      title: "Early Detection",
      description: "Proactive health monitoring with predictive wellness insights and risk assessment",
      color: "text-primary",
      badge: "Predictive"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Enthusiast",
      content: "Sync'd has completely transformed how I understand my body. The AI insights are incredibly accurate and have helped me identify patterns I never noticed before.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Chronic Pain Sufferer",
      content: "Finally, an app that truly gets it. The pain tracking and personalized recommendations have been absolutely life-changing for managing my condition.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Sleep Specialist",
      content: "The sleep tracking capabilities are remarkably sophisticated. I recommend Sync'd to all my patients for its comprehensive approach to wellness.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: "AI Chat Support",
      description: "24/7 intelligent chat support for health questions and guidance"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on similar wellness journeys"
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Get instant feedback and recommendations based on your data"
    }
  ];

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Soft Floating Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Hero Content */}
            <FadeIn>
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium rounded-full">
                    ✨ AI-Powered Wellness Platform
                  </Badge>
                  <h1 className="text-6xl lg:text-8xl font-bold mb-6 font-poppins">
                    <span className="gradient-text">Sync'd</span>
                  </h1>
                  <p className="text-2xl lg:text-3xl mb-4 text-muted-foreground font-light">
                    In sync with your body
                  </p>
                  <p className="text-xl mb-8 text-foreground/80 max-w-lg leading-relaxed">
                    Your intelligent wellness companion that learns from your body's signals to provide personalized insights for pain, sleep, nutrition, and mental health.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                    Start Your Journey
                  </Button>
                  <Button variant="soft" size="lg" className="text-lg px-8 py-6" onClick={scrollToFeatures}>
                    Discover Features
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            {/* Enhanced Body Visualization */}
            <ScaleIn delay={0.5}>
              <div className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
                <div className="relative">
                  <motion.div 
                    className="w-80 h-96 relative"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="hsl(var(--tertiary))" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <path
                        d="M100 20 C110 20 120 30 120 40 C120 50 110 60 100 60 C90 60 80 50 80 40 C80 30 90 20 100 20 Z M100 60 L90 80 L90 150 L85 200 L85 250 L90 280 L110 280 L115 250 L115 200 L110 150 L110 80 Z M90 80 L70 100 L65 130 L70 160 L90 150 M110 80 L130 100 L135 130 L130 160 L110 150"
                        fill="url(#bodyGradient)"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        filter="url(#glow)"
                      />
                    </svg>
                  </motion.div>

                  {/* Pulsing Data Points */}
                  {[
                    { top: '20%', left: '50%' },
                    { top: '40%', left: '30%' },
                    { top: '40%', right: '30%' },
                    { top: '60%', left: '50%' },
                    { top: '80%', left: '45%' },
                    { top: '80%', right: '45%' }
                  ].map((position, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-3 h-3 bg-primary rounded-full"
                      style={position}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  ))}

                  {/* Soft Glow Effect */}
                  <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'var(--gradient-glow)' }}></div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                🌟 Core Features
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
                <span className="gradient-text">Wellness Redefined</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the future of personal health with AI-powered insights that adapt to your unique needs and lifestyle
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <Card className="glass interactive group h-full hover:scale-105 transition-all duration-500">
                    <CardContent className="p-8 text-center h-full flex flex-col">
                      <div className="relative mb-6">
                        <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-glass to-glass/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Additional Features */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={feature.title} className="text-center p-6 rounded-xl bg-glass/50 backdrop-blur-sm">
                  <feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                💬 User Stories
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
                <span className="gradient-text">Trusted by Thousands</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Real people, real transformations
              </p>
            </div>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevTestimonial}
                className="absolute left-0 z-10 glass"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-12"
              >
                <Card className="glass text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg text-foreground/90 mb-6 italic leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                        <span className="text-background font-semibold text-sm">
                          {testimonials[currentTestimonial].avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={nextTestimonial}
                className="absolute right-0 z-10 glass"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary w-6' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins gradient-text">
              Ready to Transform Your Wellness?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have taken control of their health with Sync'd's intelligent wellness platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button variant="soft" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="bg-surface/50 py-12 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4 font-poppins">Sync'd</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your AI-powered wellness companion for a healthier, more connected tomorrow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AI Technology</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Scientific Research</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Privacy</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Data Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Community</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">User Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Sync'd. All rights reserved. Crafted with care for your wellness journey.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;