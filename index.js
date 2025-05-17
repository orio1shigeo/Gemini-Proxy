const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const API_SERVICE_URL = "https://generativelanguage.googleapis.com";

// Proxy middleware options
const options = {
  target: API_SERVICE_URL, // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: (path, req) => {
    // Remove the base path if your proxy is not at the root
    // For example, if your proxy is at /api, and you want to proxy /api/users to /users
    // return path.replace('/api', '');
    return path;
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can add custom headers here if needed
    // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
    }
  }
};

// Create the proxy
const apiProxy = createProxyMiddleware(options);

// Use JSON parser for incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Mount the proxy middleware
app.use('/', apiProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});