import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { DatabaseService } from '../src/database/database.service';
import { AppModule } from '../src/app.module';

describe('VaccineTrackerModule', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Get vaccine doses', () => {
    it('Success with valid params', async () => {
      const query = {
        c: 'AT',
        dateFrom: '2021-W45',
        dateTo: '2021-W53',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('summary');
    });
    it('Should throw error with wrong country param', async () => {
      const query = {
        dateFrom: '2021-W45',
        dateTo: '2021-W53',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual([
        'c must be a valid enum value',
        'c must be a string',
      ]);
    });
    it('Should throw error with wrong dateFrom param', async () => {
      const query = {
        c: 'AT',
        dateTo: '2021-W53',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual([
        'dateFrom must be a string',
        "Date must be in this format 'yyyy-Www'",
      ]);
    });
    it('Should throw error with wrong dateTo param', async () => {
      const query = {
        c: 'AT',
        dateFrom: '2021-W45',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual([
        'dateTo must be a string',
        "Date must be in this format 'yyyy-Www'",
      ]);
    });
    it('Should throw error with wrong rangeSize param', async () => {
      const query = {
        c: 'AT',
        dateFrom: '2021-W45',
        dateTo: '2021-W53',
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual([
        'rangeSize must not be less than 1',
        'rangeSize must be a number conforming to the specified constraints',
      ]);
    });
    it('Should throw error with wrong country param', async () => {
      const query = {
        dateFrom: '2021-W45',
        dateTo: '2021-W53',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(429);
      expect(response.body.message).toEqual(
        'You have exceeded the limit of requests',
      );
    });
  });
});
