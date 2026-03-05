const express = require('express');
const router = express.Router();
const { Player } = require('../models');

// קבלת נתונים כלליים ללוח הבקרה
router.get('/stats', async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();
    const topPlayers = await Player.find().sort({ rank: -1 }).limit(5);
    res.json({
      totalPlayers,
      topPlayers,
      activeLast7: totalPlayers,
      totalBattles: 0,
      revenue: { total: 0, count: 0 }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// רשימת כל השחקנים לניהול
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find().limit(50);
    res.json({ players, total: players.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
