import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send e-mail to user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/send', async (req, res) => {

  const { email } = req.body;

  await sendWelcomeEmail(email);
  res.json({ message: 'Email endpoint ready' });
});


export default router;
