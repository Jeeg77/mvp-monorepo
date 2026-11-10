
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authRoutes from './routes/auth.routes.js';
import emailRoutes from './routes/email.routes.js';

const app = express();

// CORS
const allowedOrigins = (
  process.env.CORS_ORIGINS || 'http://localhost:3000'
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Swagger
const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MVP SaaS API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    version: '1.0.0'
  });
});

// Debug endpoint - solo sviluppo
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/debug-env', (req, res) => {
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    });
  });
}

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Server startup
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
