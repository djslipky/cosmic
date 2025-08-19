import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Circle, Gamepad2, Check } from "lucide-react";
import { Facility } from "@shared/schema";

export default function Facilities() {
  const { data: facilities, isLoading, error } = useQuery<Facility[]>({
    queryKey: ["/api/facilities"],
  });

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case "bowling":
        return "🎳";
      case "billiards":
        return <Circle className="w-16 h-16 text-cosmic-purple" />;
      case "arcade":
        return <Gamepad2 className="w-16 h-16 text-neon-pink" />;
      default:
        return "🎮";
    }
  };

  const getFacilityFeatures = (type: string) => {
    switch (type) {
      case "bowling":
        return [
          "Holographic pins",
          "Anti-gravity balls", 
          "Cosmic sound effects",
          "LED lane lighting"
        ];
      case "billiards":
        return [
          "Smart cue tracking",
          "Planetary ball sets",
          "Zero-friction surfaces", 
          "Holographic trajectory"
        ];
      case "arcade":
        return [
          "VR space exploration",
          "Holographic racing",
          "Neural-link gaming",
          "Retro classics"
        ];
      default:
        return [];
    }
  };

  const getFacilityImage = (type: string) => {
    switch (type) {
      case "bowling":
        return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      case "billiards":
        return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      case "arcade":
        return "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      default:
        return "";
    }
  };

  if (error) {
    return (
      <section id="facilities" className="py-20 relative" data-testid="facilities-section">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text text-cyber-cyan">
              COSMIC FACILITIES
            </h2>
            <p className="text-red-400" data-testid="facilities-error">
              Failed to load facilities. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="facilities" className="py-20 relative" data-testid="facilities-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text text-cyber-cyan" data-testid="facilities-title">
            COSMIC FACILITIES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="facilities-subtitle">
            Three unique entertainment zones designed for an otherworldly experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <Card key={index} className="holographic neon-border p-8" data-testid={`facility-skeleton-${index}`}>
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
                    <Skeleton className="h-8 w-48 mx-auto mb-4" />
                  </div>
                  <Skeleton className="h-48 w-full mb-6 rounded-lg" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            facilities?.map((facility) => (
              <Card 
                key={facility.id} 
                className="holographic neon-border p-8 neon-glow group cursor-pointer"
                data-testid={`facility-card-${facility.type}`}
              >
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4 group-hover:animate-pulse" data-testid={`facility-icon-${facility.type}`}>
                      {getFacilityIcon(facility.type)}
                    </div>
                    <h3 className="font-orbitron text-2xl font-bold mb-4" data-testid={`facility-name-${facility.type}`}>
                      {facility.name.toUpperCase()}
                    </h3>
                  </div>
                  
                  <img 
                    src={getFacilityImage(facility.type)}
                    alt={`${facility.name} facility`}
                    className="w-full h-48 object-cover rounded-lg mb-6 neon-border"
                    data-testid={`facility-image-${facility.type}`}
                  />
                  
                  <p className="text-gray-300 mb-6" data-testid={`facility-description-${facility.type}`}>
                    {facility.description}
                  </p>
                  
                  <ul className="space-y-2 text-sm text-gray-400" data-testid={`facility-features-${facility.type}`}>
                    {getFacilityFeatures(facility.type).map((feature, index) => (
                      <li key={index} className="flex items-center" data-testid={`facility-feature-${facility.type}-${index}`}>
                        <Check className="w-4 h-4 text-alien-green mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
