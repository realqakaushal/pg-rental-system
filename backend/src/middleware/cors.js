// CORS middleware configuration
const cors = require('cors');

const configureCors = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  const corsOptions = {
    origin: function (origin, callback) {
      // List of allowed origins
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001'
      ].filter(Boolean);

      // In production, add your Render URLs
      if (process.env.NODE_ENV === 'production') {
        allowedOrigins.push(
          'https://pg-rental-frontend.onrender.com',
          'https://*.onrender.com' // Allow all Render subdomains during deployment
        );
      }

      // Allow requests with no origin (like mobile apps, postman, or same-origin)
      if (!origin) {
        return callback(null, true);
      }

      // Check if origin matches allowed origins or patterns
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed.includes('*')) {
          // Handle wildcard domains
          const regex = new RegExp(allowed.replace('*', '.*'));
          return regex.test(origin);
        }
        return allowed === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        // In development, log but allow; in production, block
        console.warn(`CORS: Origin ${origin} not in allowed list`);
        callback(isDevelopment ? null : new Error('Not allowed by CORS'), isDevelopment);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Auth-Token'
    ],
    exposedHeaders: ['X-Auth-Token'],
    maxAge: 86400 // 24 hours
  };

  return cors(corsOptions);
};

module.exports = configureCors;