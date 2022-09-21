import supertest from 'supertest';
import app from '../index';

const req =
  supertest(app);

describe('Test main Endpoint', () => {
  it('should test the main route', async () => {
    const res =
      await req.get(
        '/api'
      );
    expect(
      res.status
    ).toBe(200);
  });
});
