const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/users'); 
const serviceRoutes = require('./routes/services'); 
// const reviewRoutes = require('./routes/reviews'); 
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');


// Import your GraphQL schema and resolvers here
const schema = require('./graphql/schema'); 
const resolvers = require('./graphql/resolvers'); 

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


// GraphQL middleware setup
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
// app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
const dbURI = 'mongodb://mongodb:27017/usersdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


module.exports = app;
