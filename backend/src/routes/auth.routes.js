import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/register', async (req, res) => {
  res.json({ message: 'Register endpoint ready' });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', async (req, res) => {
  res.json({ message: 'Login endpoint ready' });
});

export default router;
