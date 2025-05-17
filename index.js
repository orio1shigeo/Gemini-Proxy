const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Target URL without trailing slash
const TARGET_URL = 'https://generativelanguage.googleapis.com';

// Setup proxy middleware
app.use('/', createProxyMiddleware({
  target: TARGET_URL,
  changeOrigin: true,
  onError: (err, req, res) => {
    res.status(500).json({
      error: 'Proxy server error',
      message: err.message
    });
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Gemini Proxy is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Gemini Proxy running on port ${PORT}`);
}); 