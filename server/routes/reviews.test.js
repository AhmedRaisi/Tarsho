const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Review Routes', () => {
  it('should create a new review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send({
        clientId: new mongoose.Types.ObjectId().toString(),
        serviceId: new mongoose.Types.ObjectId().toString(),
        rating: 4,
        comment: 'Great service!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('comment', 'Great service!');
  }, 10000); // Increased timeout
});