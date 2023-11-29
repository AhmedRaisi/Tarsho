const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password',
        email: 'test@example.com',
        role: 'client'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Additional tests for login, profile updates, etc.
});
