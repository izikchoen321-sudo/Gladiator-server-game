const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// שינוי הנתיב ל-api כפי שהקוד שלך מצפה
app.use('/api/auth', require('./routes/auth'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/stripe', require('./routes/stripe'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ DB Error:', err));

require('./sockets/game')(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
