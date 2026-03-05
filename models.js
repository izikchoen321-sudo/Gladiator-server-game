const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  class: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  gold: { type: Number, default: 100 },
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number
  },
  inventory: Array,
  equipment: {
    weapon: Object,
    armor: Object
  }
});

const battleSchema = new mongoose.Schema({
  players: [String],
  status: { type: String, enum: ['pending', 'active', 'finished'], default: 'pending' },
  winner: String,
  log: Array
});

module.exports = {
  Player: mongoose.model('Player', playerSchema),
  Battle: mongoose.model('Battle', battleSchema)
};
