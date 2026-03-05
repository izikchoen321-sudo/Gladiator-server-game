const express = require('express');
const router = express.Router();
const { Player } = require('../models');
const jwt = require('jsonwebtoken');

// נתיב להרשמה
router.post('/register', async (req, res) => {
  try {
    const { userId, name, className, stats } = req.body;
    
    // בדיקה אם השחקן כבר קיים
    let player = await Player.findOne({ userId });
    if (player) return res.status(400).json({ error: 'Player already exists' });

    player = new Player({
      userId,
      name,
      class: className,
      stats,
      inventory: [],
      equipment: { weapon: null, armor: null }
    });

    await player.save();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.json({ player, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// נתיב לכניסה (Login)
router.post('/login', async (req, res) => {
  try {
    const { userId } = req.body;
    const player = await Player.findOne({ userId });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.json({ player, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
