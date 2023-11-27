const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { createProxyMiddleware } = require('http-proxy-middleware');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users'); // Adjust path as necessary

const app = express();
const port = process.env.PORT || 4000;

// Middleware to log HTTP requests
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware for development - allowing all origins
app.use(cors());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);

// Connect to MongoDB
const dbURI = 'mongodb://User:Pass@mongodb:27017/usersdb'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Proxy middleware for development
// Forwarding frontend requests to the React development server
app.use('/', createProxyMiddleware({
  target: 'http://frontend:3000', // If the React server is on a different port, change it accordingly.
  changeOrigin: true,
  // ws: true, // Proxy websockets if you're using them
  // logLevel: 'debug' // This will help debug any issues with the proxy
}));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});