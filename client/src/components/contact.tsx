import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Transmitted!",
        description: "Your cosmic transmission has been received. We'll respond within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Transmission Failed",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    sendMessageMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 relative" data-testid="contact-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text text-cyber-cyan" data-testid="contact-title">
            GROUND CONTROL
          </h2>
          <p className="text-xl text-gray-300" data-testid="contact-subtitle">
            Ready to connect with mission control
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card className="holographic neon-border p-8">
            <CardContent className="p-0">
              <h3 className="font-orbitron text-2xl font-bold mb-8 text-cyber-cyan" data-testid="contact-info-title">
                COMMUNICATION CHANNELS
              </h3>
              
              <div className="space-y-6" data-testid="contact-info">
                <div className="flex items-center space-x-4" data-testid="contact-location">
                  <div className="w-12 h-12 bg-cyber-cyan rounded-full flex items-center justify-center">
                    <MapPin className="text-space-black text-xl" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold" data-testid="location-label">SPACE STATION LOCATION</div>
                    <div className="text-gray-300" data-testid="location-address">1337 Galactic Boulevard, Neo Tokyo, Mars Colony 90210</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-alien-green rounded-full flex items-center justify-center">
                    <Phone className="text-space-black text-xl" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold" data-testid="phone-label">QUANTUM COMMUNICATION</div>
                    <div className="text-gray-300" data-testid="phone-number">+1 (555) SPACE-88</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4" data-testid="contact-email">
                  <div className="w-12 h-12 bg-cosmic-purple rounded-full flex items-center justify-center">
                    <Mail className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold" data-testid="email-label">INTERSTELLAR EMAIL</div>
                    <div className="text-gray-300" data-testid="email-address">info@spacebowling.galaxy</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4" data-testid="contact-hours">
                  <div className="w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center">
                    <Clock className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold" data-testid="hours-label">OPERATIONAL HOURS</div>
                    <div className="text-gray-300" data-testid="hours-schedule">
                      <div>Mon-Thu: 10:00 AM - 12:00 AM</div>
                      <div>Fri-Sat: 10:00 AM - 2:00 AM</div>
                      <div>Sun: 12:00 PM - 10:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-cyber-cyan/30">
                <h4 className="font-orbitron font-bold mb-4 text-cyber-cyan" data-testid="social-title">
                  FOLLOW OUR COSMIC JOURNEY
                </h4>
                <div className="flex space-x-4" data-testid="social-links">
                  <a href="#" className="w-10 h-10 bg-dark-grey neon-border rounded-full flex items-center justify-center
                                       hover:bg-cyber-cyan hover:text-space-black transition-all" data-testid="social-facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-dark-grey neon-border rounded-full flex items-center justify-center
                                       hover:bg-cyber-cyan hover:text-space-black transition-all" data-testid="social-twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-dark-grey neon-border rounded-full flex items-center justify-center
                                       hover:bg-cyber-cyan hover:text-space-black transition-all" data-testid="social-instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-dark-grey neon-border rounded-full flex items-center justify-center
                                       hover:bg-cyber-cyan hover:text-space-black transition-all" data-testid="social-youtube">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Form */}
          <Card className="holographic neon-border p-8">
            <CardContent className="p-0">
              <h3 className="font-orbitron text-2xl font-bold mb-8 text-cyber-cyan" data-testid="contact-form-title">
                SEND TRANSMISSION
              </h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label className="block font-orbitron font-bold mb-2 text-alien-green" data-testid="form-name-label">
                    NAME
                  </Label>
                  <Input
                    type="text"
                    placeholder="Your galactic identifier"
                    className="w-full bg-dark-grey neon-border p-4 text-white placeholder-gray-500
                              focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                    {...form.register("name")}
                    data-testid="input-contact-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-2" data-testid="contact-name-error">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="block font-orbitron font-bold mb-2 text-alien-green" data-testid="form-email-label">
                    EMAIL
                  </Label>
                  <Input
                    type="email"
                    placeholder="your.email@galaxy.com"
                    className="w-full bg-dark-grey neon-border p-4 text-white placeholder-gray-500
                              focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                    {...form.register("email")}
                    data-testid="input-contact-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-2" data-testid="contact-email-error">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="block font-orbitron font-bold mb-2 text-alien-green" data-testid="form-message-label">
                    MESSAGE
                  </Label>
                  <Textarea
                    rows={6}
                    placeholder="Share your cosmic thoughts..."
                    className="w-full bg-dark-grey neon-border p-4 text-white placeholder-gray-500
                              focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50 resize-none"
                    {...form.register("message")}
                    data-testid="textarea-contact-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm mt-2" data-testid="contact-message-error">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={sendMessageMutation.isPending}
                  className="w-full neon-border holographic py-4 font-orbitron font-bold neon-glow
                            hover:bg-cyber-cyan hover:text-space-black transition-all duration-300 disabled:opacity-50"
                  data-testid="button-send-message"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {sendMessageMutation.isPending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
