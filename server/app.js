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
const dbURI = 'mongodb://user:pass@mongodb:27017/usersdb'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error(err));

module.exports = app;
