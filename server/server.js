const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Require your user routes
const userRoutes = require('./routes/users');

// Initialize express app
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port if set, otherwise default to 4000

// Setup CORS with options if needed for production
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match the domain of your frontend app
  methods: 'GET,POST,PUT,DELETE', // The HTTP methods allowed
  credentials: true // If your frontend needs to send cookies or credentials with the requests
}));

// Use express json middleware to automatically parse JSON
app.use(express.json());

app.use(morgan('dev')); // 'dev' is a predefined format string

// Serve API documentation setup with Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User routes
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
      // Add other endpoints as needed
    ]
  });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
