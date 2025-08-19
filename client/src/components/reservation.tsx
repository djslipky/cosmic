import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertReservationSchema, Facility } from "@shared/schema";
import { z } from "zod";
import { Rocket, Circle, Gamepad2 } from "lucide-react";

type ReservationFormData = z.infer<typeof insertReservationSchema>;

export default function Reservation() {
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: facilities } = useQuery<Facility[]>({
    queryKey: ["/api/facilities"],
  });

  const { data: availability } = useQuery<Array<{time: string, available: boolean, displayTime: string}>>({
    queryKey: ["/api/availability", selectedFacility, selectedDate],
    enabled: !!(selectedFacility && selectedDate),
  });

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(insertReservationSchema),
    defaultValues: {
      facilityId: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      date: "",
      time: "",
      duration: 1,
      partySize: 1,
      pricingTier: "commander",
      totalCost: "0.00",
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: async (data: ReservationFormData) => {
      const response = await apiRequest("POST", "/api/reservations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed!",
        description: "Your cosmic adventure awaits. Check your email for details.",
      });
      form.reset();
      setSelectedFacility("");
      setSelectedDate("");
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationFormData) => {
    createReservationMutation.mutate(data);
  };

  const handleFacilitySelect = (facilityId: string) => {
    setSelectedFacility(facilityId);
    form.setValue("facilityId", facilityId);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    form.setValue("date", date);
  };

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case "bowling":
        return <span className="text-2xl">🎳</span>;
      case "billiards":
        return <Circle className="w-6 h-6" />;
      case "arcade":
        return <Gamepad2 className="w-6 h-6" />;
      default:
        return <span className="text-2xl">🎮</span>;
    }
  };

  return (
    <section id="reservations" className="py-20 relative" data-testid="reservation-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text text-cyber-cyan" data-testid="reservation-title">
            MISSION CONTROL
          </h2>
          <p className="text-xl text-gray-300" data-testid="reservation-subtitle">
            Book your cosmic adventure
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="holographic neon-border p-8">
            <CardContent className="p-0">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="reservation-form">
                {/* Facility Selection */}
                <div>
                  <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="facility-label">
                    SELECT FACILITY
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {facilities?.map((facility) => (
                      <Button
                        key={facility.id}
                        type="button"
                        variant="outline"
                        className={`neon-border holographic p-4 neon-glow text-center group transition-all h-auto flex-col space-y-2 ${
                          selectedFacility === facility.id 
                            ? "bg-cyber-cyan text-space-black" 
                            : "hover:bg-cyber-cyan hover:text-space-black"
                        }`}
                        onClick={() => handleFacilitySelect(facility.id)}
                        data-testid={`facility-button-${facility.type}`}
                      >
                        <div className="group-hover:animate-pulse">
                          {getFacilityIcon(facility.type)}
                        </div>
                        <div className="font-orbitron font-bold text-sm">
                          {facility.name.toUpperCase()}
                        </div>
                      </Button>
                    ))}
                  </div>
                  {form.formState.errors.facilityId && (
                    <p className="text-red-400 text-sm mt-2" data-testid="facility-error">
                      {form.formState.errors.facilityId.message}
                    </p>
                  )}
                </div>
                
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="date-label">
                      LAUNCH DATE
                    </Label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white
                                focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                      {...form.register("date")}
                      onChange={(e) => {
                        form.register("date").onChange(e);
                        handleDateChange(e.target.value);
                      }}
                      data-testid="input-date"
                    />
                    {form.formState.errors.date && (
                      <p className="text-red-400 text-sm mt-2" data-testid="date-error">
                        {form.formState.errors.date.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="time-label">
                      DEPARTURE TIME
                    </Label>
                    <Select onValueChange={(value) => form.setValue("time", value)} data-testid="select-time">
                      <SelectTrigger className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white
                                               focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availability?.map((slot) => (
                          <SelectItem 
                            key={slot.time} 
                            value={slot.time}
                            disabled={!slot.available}
                            data-testid={`time-slot-${slot.time}`}
                          >
                            {slot.displayTime} {!slot.available && "(Booked)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.time && (
                      <p className="text-red-400 text-sm mt-2" data-testid="time-error">
                        {form.formState.errors.time.message}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Party Size and Contact */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="party-size-label">
                      CREW SIZE
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="Number of players"
                      className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white placeholder-gray-500
                                focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                      {...form.register("partySize", { valueAsNumber: true })}
                      data-testid="input-party-size"
                    />
                    {form.formState.errors.partySize && (
                      <p className="text-red-400 text-sm mt-2" data-testid="party-size-error">
                        {form.formState.errors.partySize.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="phone-label">
                      CONTACT FREQUENCY
                    </Label>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white placeholder-gray-500
                                focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                      {...form.register("customerPhone")}
                      data-testid="input-phone"
                    />
                    {form.formState.errors.customerPhone && (
                      <p className="text-red-400 text-sm mt-2" data-testid="phone-error">
                        {form.formState.errors.customerPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="name-label">
                      CAPTAIN NAME
                    </Label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white placeholder-gray-500
                                focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                      {...form.register("customerName")}
                      data-testid="input-name"
                    />
                    {form.formState.errors.customerName && (
                      <p className="text-red-400 text-sm mt-2" data-testid="name-error">
                        {form.formState.errors.customerName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block font-orbitron text-lg font-bold mb-4 text-cyber-cyan" data-testid="email-label">
                      SPACE EMAIL
                    </Label>
                    <Input
                      type="email"
                      placeholder="your.email@galaxy.com"
                      className="w-full bg-dark-grey neon-border p-4 font-orbitron text-white placeholder-gray-500
                                focus:outline-none focus:shadow-lg focus:shadow-cyber-cyan/50"
                      {...form.register("customerEmail")}
                      data-testid="input-email"
                    />
                    {form.formState.errors.customerEmail && (
                      <p className="text-red-400 text-sm mt-2" data-testid="email-error">
                        {form.formState.errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={createReservationMutation.isPending}
                    className="neon-border holographic px-12 py-4 font-orbitron font-bold text-xl neon-glow
                              hover:bg-cyber-cyan hover:text-space-black transition-all duration-300 disabled:opacity-50"
                    data-testid="button-submit-reservation"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    {createReservationMutation.isPending ? "LAUNCHING..." : "INITIATE BOOKING SEQUENCE"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Availability Display */}
          {availability && selectedDate && (
            <Card className="mt-12 holographic neon-border p-6">
              <CardContent className="p-0">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-center text-cyber-cyan" data-testid="availability-title">
                  REAL-TIME AVAILABILITY
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                  {availability.map((slot) => (
                    <div
                      key={slot.time}
                      className={`p-3 bg-dark-grey rounded border ${
                        slot.available 
                          ? "border-alien-green/50" 
                          : "border-neon-pink/50"
                      }`}
                      data-testid={`availability-slot-${slot.time}`}
                    >
                      <div className="font-bold" data-testid={`slot-time-${slot.time}`}>
                        {slot.displayTime}
                      </div>
                      <div className={slot.available ? "text-alien-green" : "text-neon-pink"} data-testid={`slot-status-${slot.time}`}>
                        {slot.available ? "Available" : "Booked"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
