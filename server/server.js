const app = require('./app');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 4000;

// Proxy middleware for development
// Forwarding frontend requests to the React development server
app.use('/', createProxyMiddleware({
  target: 'http://frontend:3000',
  changeOrigin: true,
  // ws: true,
  // logLevel: 'debug'
}));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
