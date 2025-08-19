import express from 'express';
import request from 'supertest';
import { registerRoutes } from './routes';
import { storage } from './storage';

describe('API routes', () => {
  let app: express.Express;
  let facilityId: string;

  beforeEach(async () => {
    // reset storage
    (storage as any).reservations.clear();
    (storage as any).contactMessages.clear();
    const facilities = await storage.getFacilities();
    facilityId = facilities[0].id;
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  describe('/api/reservations', () => {
    const baseReservation = {
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '1234567890',
      date: '2099-01-01',
      time: '10:00',
      duration: 1,
      partySize: 2,
      pricingTier: 'explorer',
      totalCost: '0.00'
    };

    it('creates and lists reservations', async () => {
      const res = await request(app)
        .post('/api/reservations')
        .send({ ...baseReservation, facilityId });
      expect(res.status).toBe(201);
      expect(res.body.facilityId).toBe(facilityId);

      const list = await request(app).get('/api/reservations');
      expect(list.status).toBe(200);
      expect(list.body.length).toBe(1);
    });

    it('prevents double booking', async () => {
      await request(app).post('/api/reservations').send({ ...baseReservation, facilityId });
      const conflict = await request(app).post('/api/reservations').send({ ...baseReservation, facilityId });
      expect(conflict.status).toBe(409);
    });
  });

  describe('/api/contact', () => {
    it('accepts contact message', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Hello from space!'
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Jane');
    });

    it('validates contact message', async () => {
      const res = await request(app).post('/api/contact').send({
        name: '',
        email: 'invalid',
        message: 'short'
      });
      expect(res.status).toBe(400);
    });
  });
});
