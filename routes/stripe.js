const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { userId, packId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'ils',
        product_data: { name: 'חבילת זהב למשחק' },
        unit_amount: 2000, // 20 ש"ח
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://your-game.com/success',
    cancel_url: 'https://your-game.com/cancel',
    metadata: { userId, packId }
  });
  res.json({ id: session.id });
});

module.exports = router;
