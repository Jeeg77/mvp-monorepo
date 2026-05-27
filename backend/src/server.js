import express from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";

const app = express();

const specs = {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "1.0.0"
  },
  paths: {
    "/api/health": {
      get: {
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    }
  }
};

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/email/send', (req, res) => {
  res.json({ message: 'Email endpoint ready' });
});

app.listen(4000, () => console.log('API on 4000'));