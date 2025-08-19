import { type User, type InsertUser, type Facility, type InsertFacility, type Reservation, type InsertReservation, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getFacilities(): Promise<Facility[]>;
  getFacility(id: string): Promise<Facility | undefined>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  
  getReservations(): Promise<Reservation[]>;
  getReservation(id: string): Promise<Reservation | undefined>;
  getReservationsByDate(date: string): Promise<Reservation[]>;
  getReservationsByFacilityAndDate(facilityId: string, date: string): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(id: string, updates: Partial<Reservation>): Promise<Reservation | undefined>;
  deleteReservation(id: string): Promise<boolean>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private facilities: Map<string, Facility>;
  private reservations: Map<string, Reservation>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.facilities = new Map();
    this.reservations = new Map();
    this.contactMessages = new Map();
    
    // Initialize with default facilities
    this.initializeDefaultFacilities();
  }

  private initializeDefaultFacilities() {
    const defaultFacilities: InsertFacility[] = [
      {
        name: "Quantum Bowling",
        type: "bowling",
        description: "20 state-of-the-art lanes with holographic scoring systems and cosmic lighting effects",
        capacity: 8,
        hourlyRate: "45.00",
      },
      {
        name: "Nebula Billiards",
        type: "billiards",
        description: "12 premium tables with electromagnetic cue technology and asteroid-inspired designs",
        capacity: 4,
        hourlyRate: "35.00",
      },
      {
        name: "Galactic Arcade",
        type: "arcade",
        description: "100+ cutting-edge games featuring VR, AR, and classic arcade experiences",
        capacity: 20,
        hourlyRate: "25.00",
      },
    ];

    defaultFacilities.forEach((facility) => {
      const id = randomUUID();
      const newFacility: Facility = { ...facility, id };
      this.facilities.set(id, newFacility);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values());
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }

  async createFacility(insertFacility: InsertFacility): Promise<Facility> {
    const id = randomUUID();
    const facility: Facility = { ...insertFacility, id };
    this.facilities.set(id, facility);
    return facility;
  }

  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.date === date
    );
  }

  async getReservationsByFacilityAndDate(facilityId: string, date: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.facilityId === facilityId && reservation.date === date
    );
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = {
      ...insertReservation,
      id,
      duration: insertReservation.duration || 1,
      status: insertReservation.status || "confirmed",
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async updateReservation(id: string, updates: Partial<Reservation>): Promise<Reservation | undefined> {
    const existing = this.reservations.get(id);
    if (!existing) return undefined;
    
    const updated: Reservation = { ...existing, ...updates };
    this.reservations.set(id, updated);
    return updated;
  }

  async deleteReservation(id: string): Promise<boolean> {
    return this.reservations.delete(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
