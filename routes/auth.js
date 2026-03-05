const express = require('express');
const router = express.Router();
const { Player } = require('../models');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { username, password, gladiatorClass, email } = req.body;
    const player = new Player({
      username,
      password, // במציאות כדאי להצפין, אבל כרגע נשמור על פשטות
      email,
      gladiator: {
        name: username,
        class: gladiatorClass,
        baseStats: { hp: 100, attack: 10, defense: 10, speed: 10, critChance: 5 }
      }
    });
    await player.save();
    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET || 'secret');
    res.json({ player, token });
  } catch (err) {
    res.status(500).json({ error: 'שם משתמש כבר קיים או שגיאת מערכת' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ username, password });
    if (!player) return res.status(401).json({ error: 'פרטים שגויים' });
    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET || 'secret');
    res.json({ player, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
