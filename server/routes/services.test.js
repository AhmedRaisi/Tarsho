const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Service Routes', () => {
  it('should create a new service', async () => {
    const res = await request(app)
      .post('/api/services')
      .send({
        providerId: new mongoose.Types.ObjectId().toString(),
        name: 'Test Service',
        description: 'A test service',
        price: 100
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Service');
  });

  // Additional tests for fetching, updating, etc.
});
