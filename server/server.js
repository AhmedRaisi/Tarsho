const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sample API endpoint
app.get('/api/someendpoint', (req, res) => {
  const responseData = {
    message: 'This is a sample API endpoint',
    data: { key: 'value' },
  };
  res.json(responseData);
});

// Update the proxy middleware to point to the frontend service
app.use('/', createProxyMiddleware({ target: 'http://frontend:3000', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
