import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send email
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/send', async (req, res) => {
  res.json({ message: 'Email endpoint ready' });
});

export default router;
