import logoPath from "@assets/logo-01_1755598009769.png";

export default function Footer() {
  return (
    <footer className="border-t border-cyber-cyan/30 py-8" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0" data-testid="footer-logo">
            <img 
              src={logoPath} 
              alt="Space Bowling Logo" 
              className="h-8 w-auto"
              data-testid="footer-logo-img"
            />
            <span className="font-orbitron font-bold text-cyber-cyan" data-testid="footer-site-name">
              SPACE BOWLING
            </span>
          </div>
          
          <div className="text-center text-gray-400" data-testid="footer-copyright">
            <p>&copy; 2024 Space Bowling. All rights reserved across the galaxy.</p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0" data-testid="footer-links">
            <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors" data-testid="footer-link-privacy">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors" data-testid="footer-link-terms">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors" data-testid="footer-link-support">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
