import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all facilities
  app.get("/api/facilities", async (req, res) => {
    try {
      const facilities = await storage.getFacilities();
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch facilities" });
    }
  });

  // Get availability for a specific date and facility
  app.get("/api/availability/:facilityId/:date", async (req, res) => {
    try {
      const { facilityId, date } = req.params;
      const reservations = await storage.getReservationsByFacilityAndDate(facilityId, date);
      
      // Generate availability slots (10 AM to 10 PM, hourly slots)
      const timeSlots = [];
      for (let hour = 10; hour <= 22; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const isBooked = reservations.some(r => r.time === timeString);
        timeSlots.push({
          time: timeString,
          available: !isBooked,
          displayTime: hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`
        });
      }
      
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  // Create a new reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      
      // Check if the time slot is already booked
      const existingReservations = await storage.getReservationsByFacilityAndDate(
        validatedData.facilityId,
        validatedData.date
      );
      
      const isTimeSlotTaken = existingReservations.some(r => r.time === validatedData.time);
      if (isTimeSlotTaken) {
        return res.status(409).json({ error: "This time slot is already booked" });
      }
      
      // Get facility to calculate pricing
      const facility = await storage.getFacility(validatedData.facilityId);
      if (!facility) {
        return res.status(404).json({ error: "Facility not found" });
      }
      
      // Calculate total cost based on pricing tier
      const baseRate = parseFloat(facility.hourlyRate);
      let multiplier = 1;
      
      switch (validatedData.pricingTier) {
        case 'explorer':
          multiplier = 0.8; // 20% discount for basic tier
          break;
        case 'commander':
          multiplier = 1.2; // 20% premium
          break;
        case 'galactic-vip':
          multiplier = 1.8; // 80% premium for VIP
          break;
      }
      
      const totalCost = (baseRate * multiplier * (validatedData.duration || 1)).toFixed(2);
      
      const reservation = await storage.createReservation({
        ...validatedData,
        totalCost,
      });
      
      res.status(201).json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create reservation" });
    }
  });

  // Get all reservations
  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  });

  // Update reservation status
  app.patch("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const updated = await storage.updateReservation(id, { status });
      if (!updated) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update reservation" });
    }
  });

  // Delete reservation
  app.delete("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteReservation(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete reservation" });
    }
  });

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
