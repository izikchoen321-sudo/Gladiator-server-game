const { Player, Battle } = require('../models');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('startBattle', async ({ playerId }) => {
      // כאן יהיה הלוגיקה של מציאת יריב
      socket.emit('battleStarted', { message: "הקרב התחיל!" });
    });
  });
};
