// Import required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { graphqlHTTP } = require('express-graphql');

// Import Swagger documentation and GraphQL schema/resolvers
const swaggerSpec = require('./swagger');
const schema = require('./graphql/schema'); 
const resolvers = require('./graphql/resolvers'); 

// Import routes
const userRoutes = require('./routes/users'); 
const serviceRoutes = require('./routes/services'); 
// const reviewRoutes = require('./routes/reviews'); 

// Initialize Express app
const app = express();

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Custom Morgan token to skip logging for specific routes (e.g., hot-update requests)
morgan.token('ignore-hot-update', function (req, res) {
  return req.url.includes('.hot-update.') ? null : res.statusCode;
});
app.use(morgan(':method :url :ignore-hot-update :response-time ms'));

// Middleware to parse JSON bodies - essential for processing JSON request payloads
app.use(express.json());

// CORS middleware for allowing cross-origin requests (useful in development)
app.use(cors());

// Setup GraphQL middleware for handling GraphQL requests
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,  // Enable GraphiQL interface for testing GraphQL queries
}));

// Swagger UI setup for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
// app.use('/api/reviews', reviewRoutes); 

// Export the configured Express app
module.exports = app;
