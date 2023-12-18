const app = require('./app');
const connectDB = require('./config/db');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Proxy middleware for development
// Forwarding frontend requests to the React development server
// app.use('/', createProxyMiddleware({
//   target: 'http://frontend:3000',
//   changeOrigin: true,
// }));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
