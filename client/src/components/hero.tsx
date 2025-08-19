import { Rocket, Play, Satellite, Plane, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToReservations = () => {
    const element = document.getElementById("reservations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center" data-testid="hero-section">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 cyber-text text-cyber-cyan animate-glow" data-testid="hero-title">
          SPACE BOWLING
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300" data-testid="hero-subtitle">
          Experience the future of entertainment in our cosmic arena
        </p>
        <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-400" data-testid="hero-description">
          Bowling, billiards, and arcade games in a mind-bending space environment with cutting-edge technology
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            onClick={scrollToReservations}
            className="neon-border holographic px-8 py-4 font-orbitron font-bold text-lg neon-glow 
                      hover:bg-cyber-cyan hover:text-space-black transition-all duration-300"
            data-testid="button-launch-reservation"
          >
            <Rocket className="mr-2 h-5 w-5" />
            LAUNCH RESERVATION
          </Button>
          <Button 
            variant="outline"
            className="border border-cosmic-purple px-8 py-4 font-orbitron font-bold text-lg
                      hover:bg-cosmic-purple hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all duration-300"
            data-testid="button-virtual-tour"
          >
            <Play className="mr-2 h-5 w-5" />
            VIRTUAL TOUR
          </Button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float" data-testid="floating-satellite">
        <Satellite className="w-10 h-10 text-cyber-cyan opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "-2s" }} data-testid="floating-plane">
        <Plane className="w-8 h-8 text-cosmic-purple opacity-60" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "-4s" }} data-testid="floating-zap">
        <Zap className="w-6 h-6 text-neon-pink opacity-60" />
      </div>
    </section>
  );
}
