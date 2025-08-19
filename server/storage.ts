import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import {
  users,
  facilities,
  reservations,
  contactMessages,
  type User,
  type InsertUser,
  type Facility,
  type InsertFacility,
  type Reservation,
  type InsertReservation,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

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
  getReservationsByFacilityAndDate(
    facilityId: string,
    date: string,
  ): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(
    id: string,
    updates: Partial<Reservation>,
  ): Promise<Reservation | undefined>;
  deleteReservation(id: string): Promise<boolean>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

class DbStorage implements IStorage {
  constructor() {
    void this.initializeDefaultFacilities();
  }

  private async initializeDefaultFacilities() {
    const existing = await db.select().from(facilities).limit(1);
    if (existing.length > 0) return;

    const defaults: InsertFacility[] = [
      {
        name: "Quantum Bowling",
        type: "bowling",
        description:
          "20 state-of-the-art lanes with holographic scoring systems and cosmic lighting effects",
        capacity: 8,
        hourlyRate: "45.00",
      },
      {
        name: "Nebula Billiards",
        type: "billiards",
        description:
          "12 premium tables with electromagnetic cue technology and asteroid-inspired designs",
        capacity: 4,
        hourlyRate: "35.00",
      },
      {
        name: "Galactic Arcade",
        type: "arcade",
        description:
          "100+ cutting-edge games featuring VR, AR, and classic arcade experiences",
        capacity: 20,
        hourlyRate: "25.00",
      },
    ];

    await db.insert(facilities).values(defaults);
  }

  async getUser(id: string): Promise<User | undefined> {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.query.users.findFirst({ where: eq(users.username, username) });
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getFacilities(): Promise<Facility[]> {
    return db.select().from(facilities);
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    const [facility] = await db
      .select()
      .from(facilities)
      .where(eq(facilities.id, id));
    return facility;
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const [created] = await db.insert(facilities).values(facility).returning();
    return created;
  }

  async getReservations(): Promise<Reservation[]> {
    return db.select().from(reservations);
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    const [reservation] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, id));
    return reservation;
  }

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    return db
      .select()
      .from(reservations)
      .where(eq(reservations.date, date));
  }

  async getReservationsByFacilityAndDate(
    facilityId: string,
    date: string,
  ): Promise<Reservation[]> {
    return db
      .select()
      .from(reservations)
      .where(
        and(eq(reservations.facilityId, facilityId), eq(reservations.date, date)),
      );
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [created] = await db
      .insert(reservations)
      .values(reservation)
      .returning();
    return created;
  }

  async updateReservation(
    id: string,
    updates: Partial<Reservation>,
  ): Promise<Reservation | undefined> {
    const [updated] = await db
      .update(reservations)
      .set(updates)
      .where(eq(reservations.id, id))
      .returning();
    return updated;
  }

  async deleteReservation(id: string): Promise<boolean> {
    const deleted = await db
      .delete(reservations)
      .where(eq(reservations.id, id))
      .returning({ id: reservations.id });
    return deleted.length > 0;
  }

  async createContactMessage(
    message: InsertContactMessage,
  ): Promise<ContactMessage> {
    const [created] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }
}

export const storage = new DbStorage();
