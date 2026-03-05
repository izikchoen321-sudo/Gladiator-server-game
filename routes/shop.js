const express = require('express');
const router = express.Router();
const { Player } = require('../models');

const ITEMS = {
  'sword_1': { name: 'חרב פשוטה', price: 50, stats: { attack: 5 } },
  'armor_1': { name: 'שריון עור', price: 80, stats: { defense: 5 } }
};

router.post('/buy', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const player = await Player.findOne({ userId });
    const item = ITEMS[itemId];

    if (player.gold < item.price) return res.status(400).json({ error: 'אין מספיק זהב' });

    player.gold -= item.price;
    player.inventory.push(item);
    await player.save();
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
