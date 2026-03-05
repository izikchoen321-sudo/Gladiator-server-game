require(‘dotenv’).config();
const express = require(‘express’);
const http = require(‘http’);
const { Server } = require(‘socket.io’);
const mongoose = require(‘mongoose’);
const cors = require(‘cors’);

const authRoutes = require(’./routes/auth’);
const shopRoutes = require(’./routes/shop’);
const adminRoutes = require(’./routes/admin’);
const stripeRoutes = require(’./routes/stripe’);
const { setupGameSockets } = require(’./sockets/game’);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: ‘*’, methods: [‘GET’, ‘POST’] }
});

app.use(cors());
// Stripe webhook needs raw body
app.use(’/api/stripe/webhook’, express.raw({ type: ‘application/json’ }));
app.use(express.json());

// Routes
app.use(’/api/auth’, authRoutes);
app.use(’/api/shop’, shopRoutes);
app.use(’/api/admin’, adminRoutes);
app.use(’/api/stripe’, stripeRoutes);

app.get(’/health’, (req, res) => res.json({ status: ‘ok’, time: new Date() }));

// Connect DB
mongoose.connect(process.env.MONGO_URI || ‘mongodb://localhost:27017/gladiator’)
.then(() => console.log(‘✅ MongoDB connected’))
.catch(err => console.error(‘❌ MongoDB error:’, err));

// Socket.io game
setupGameSockets(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🏟️ Gladiator server running on port ${PORT}`));
