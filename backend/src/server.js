import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';

import authRoutes from './routes/auth.routes.js';
import emailRoutes from './routes/email.routes.js';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mvp-monorepo-frontend-jeeg-77-dev.apps.rm1.0a51.p1.openshiftapps.com"
  ],
  credentials: true
}));

app.use(express.json());


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

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    version: "NEW_BUILD"
  });
});

app.get('/api/debug-env', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

import dns from 'node:dns/promises';

(async () => {
  console.log('=== DNS TEST START ===');

  try {
    const google = await dns.lookup('google.com');
    console.log('GOOGLE DNS:', google);
  } catch (err) {
    console.error('GOOGLE DNS ERROR:', err);
  }

  try {
    const supabase = await dns.lookup('dsrhmnndazbmfadrfeut.supabase.co');
    console.log('SUPABASE DNS:', supabase);
  } catch (err) {
    console.error('SUPABASE DNS ERROR:', err);
  }

  console.log('=== DNS TEST END ===');
})();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});



