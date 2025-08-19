import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    id: "explorer",
    name: "EXPLORER",
    price: 25,
    description: "Perfect for casual cosmic fun",
    color: "alien-green",
    features: [
      "Bowling or Billiards access",
      "Basic cosmic lighting",
      "Standard equipment",
      "Group scoring system",
    ],
  },
  {
    id: "commander",
    name: "COMMANDER",
    price: 45,
    description: "Enhanced cosmic experience",
    color: "cyber-cyan",
    popular: true,
    features: [
      "All facilities access",
      "Premium holographic effects",
      "Advanced equipment",
      "Personal cosmic assistant",
      "Complimentary space snacks",
    ],
  },
  {
    id: "galactic-vip",
    name: "GALACTIC VIP",
    price: 75,
    description: "Ultimate space entertainment",
    color: "cosmic-purple",
    features: [
      "Exclusive VIP area access",
      "Full holographic immersion",
      "Premium cosmic equipment",
      "Dedicated space butler",
      "Gourmet space cuisine",
      "Private cosmic bar",
    ],
  },
];

export default function Pricing() {
  const scrollToReservations = () => {
    const element = document.getElementById("reservations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 relative" data-testid="pricing-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text text-cyber-cyan" data-testid="pricing-title">
            COSMIC PRICING
          </h2>
          <p className="text-xl text-gray-300" data-testid="pricing-subtitle">
            Choose your adventure tier
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`holographic neon-border p-8 neon-glow relative ${
                tier.popular ? "transform scale-105 border-cyber-cyan" : ""
              }`}
              data-testid={`pricing-card-${tier.id}`}
            >
              {tier.popular && (
                <div className="bg-cyber-cyan text-space-black px-4 py-1 rounded-full text-sm font-bold mb-4 text-center" data-testid="popular-badge">
                  MOST POPULAR
                </div>
              )}
              
              <CardContent className="p-0">
                <div className="text-center mb-8">
                  <h3 className={`font-orbitron text-2xl font-bold mb-4 text-${tier.color}`} data-testid={`tier-name-${tier.id}`}>
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold mb-2">
                    <span className={`text-${tier.color}`} data-testid={`tier-price-${tier.id}`}>
                      ${tier.price}
                    </span>
                    <span className="text-lg text-gray-400">/hour</span>
                  </div>
                  <p className="text-gray-400" data-testid={`tier-description-${tier.id}`}>
                    {tier.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8" data-testid={`tier-features-${tier.id}`}>
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center" data-testid={`feature-${tier.id}-${index}`}>
                      <Check className={`w-5 h-5 text-${tier.color} mr-3`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={scrollToReservations}
                  className={`w-full py-3 font-orbitron font-bold transition-all duration-300 ${
                    tier.popular
                      ? "bg-cyber-cyan text-space-black hover:shadow-lg hover:shadow-cyber-cyan/50"
                      : `border border-${tier.color} hover:bg-${tier.color} hover:text-space-black`
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                  data-testid={`button-select-${tier.id}`}
                >
                  SELECT {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
