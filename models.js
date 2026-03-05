const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: { type: String, required: true },
  coins: { type: Number, default: 100 },
  gold: { type: Number, default: 500 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  rank: { type: Number, default: 1000 },
  gladiator: {
    name: String,
    class: String,
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    icon: { type: String, default: '⚔️' },
    baseStats: Object,
    equippedSkills: { type: Array, default: [] },
    weapon: { type: Object, default: null },
    armor: { type: Object, default: null }
  }
});

module.exports = {
  Player: mongoose.model('Player', playerSchema),
  Battle: mongoose.model('Battle', new mongoose.Schema({
    players: Array,
    status: String,
    turn: { type: Number, default: 0 }
  }))
};
