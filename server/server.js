const express = require('express');
const app = express();
const port = 4000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/users');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Tarsho!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
