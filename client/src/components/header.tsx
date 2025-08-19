import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/logo-01_1755598009769.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="relative z-50 border-b border-cyber-cyan/30" data-testid="header">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4" data-testid="logo-section">
            <img 
              src={logoPath} 
              alt="Space Bowling Logo" 
              className="h-12 w-auto"
              data-testid="logo-img"
            />
            <h1 className="font-orbitron text-2xl font-bold cyber-text text-cyber-cyan" data-testid="site-title">
              SPACE BOWLING
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8" data-testid="nav-links">
            <button 
              onClick={() => scrollToSection("home")} 
              className="hover:text-cyber-cyan transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("facilities")} 
              className="hover:text-cyber-cyan transition-colors"
              data-testid="nav-facilities"
            >
              Facilities
            </button>
            <button 
              onClick={() => scrollToSection("reservations")} 
              className="hover:text-cyber-cyan transition-colors"
              data-testid="nav-reservations"
            >
              Book Now
            </button>
            <button 
              onClick={() => scrollToSection("pricing")} 
              className="hover:text-cyber-cyan transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="hover:text-cyber-cyan transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          
          <button 
            className="md:hidden text-cyber-cyan"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-cyber-cyan/30" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-left hover:text-cyber-cyan transition-colors"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("facilities")} 
                className="text-left hover:text-cyber-cyan transition-colors"
                data-testid="mobile-nav-facilities"
              >
                Facilities
              </button>
              <button 
                onClick={() => scrollToSection("reservations")} 
                className="text-left hover:text-cyber-cyan transition-colors"
                data-testid="mobile-nav-reservations"
              >
                Book Now
              </button>
              <button 
                onClick={() => scrollToSection("pricing")} 
                className="text-left hover:text-cyber-cyan transition-colors"
                data-testid="mobile-nav-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-left hover:text-cyber-cyan transition-colors"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
