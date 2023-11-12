const express = require('express');
const app = express();
const port = 4000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/users');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoutes);

// Example route for the root URL that sends a simple message
app.get('/', (req, res) => {
  res.send('Welcome to the Tarsho API server!');
});

// Example route that returns a JSON response with available API endpoints
app.get('/api', (req, res) => {
  res.json({
    message: 'Available API Endpoints',
    endpoints: [
      { method: 'GET', path: '/api/users', description: 'Get all users' },
      // List other endpoints here
    ]
  });
});

// Other route setups
// ...

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});