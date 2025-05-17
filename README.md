# Gemini-Proxy

A simple proxy service for Google Gemini API requests that can be deployed on the Render platform. Once deployed, the URL can directly replace the official API address `https://generativelanguage.googleapis.com` without any additional configuration.

## Features

- Proxies all requests to Google Gemini API
- Supports CORS, can be called from any website
- Easy to deploy on the Render platform
- Clean URL replacement, no additional configuration needed

## Deployment Guide

### Local Development

1. Clone this repository
   ```
   git clone https://github.com/yourusername/gemini-proxy.git
   cd gemini-proxy
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

### Deploy on Render

1. Create a new Web Service on [Render](https://render.com/)

2. Connect to your GitHub repository

3. Use the following settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT`: `10000` (Render's default port)

4. Click the "Create Web Service" button

After deployment, you'll receive a URL like `https://your-app-name.onrender.com`. This URL can replace the official API address `https://generativelanguage.googleapis.com`.

## Usage

### Replace the Official API Address

In your code, simply change the base URL of your Gemini API requests from `https://generativelanguage.googleapis.com` to your proxy URL:

```javascript
// Original request
const originalUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Modified to use proxy URL
const proxyUrl = "https://your-app-name.onrender.com/v1beta/models/gemini-pro:generateContent";
```

Note that you still need to provide your own API key as a parameter in your requests (?key=YOUR_API_KEY).

### Health Check

You can check if the proxy service is running correctly by accessing the `/health` endpoint:

```
https://your-app-name.onrender.com/health
```

## Notes

- This proxy service only forwards requests without storing or modifying any request/response content
- This proxy doesn't provide an API key, you need to use your own Google Gemini API key

## License

MIT 