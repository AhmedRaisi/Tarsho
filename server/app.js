const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/users'); // Adjust path as necessary
const serviceRoutes = require('./routes/services'); // Adjust path as necessary
const reviewRoutes = require('./routes/reviews'); // Adjust path as necessary
const mongoose = require('mongoose');

const app = express();

// Middleware to log HTTP requests
app.use(morgan('dev'));

// Custom Morgan token to skip logging for specific routes
morgan.token('ignore-hot-update', function (req, res) {
  return req.url.includes('.hot-update.') ? null : res.statusCode;
});

// Use the custom token in your logging format
app.use(morgan(':method :url :ignore-hot-update :response-time ms'));

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware for development - allowing all origins
app.use(cors());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
const dbURI = 'mongodb://mongodb:27017/usersdb'
mongoose.connect(dbURI)
  .catch(err => console.error(err));


module.exports = app;
