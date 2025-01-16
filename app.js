const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');
const adRoutes = require('./routes/ad');
const messageRoutes = require('./routes/message');
require('dotenv').config();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/messages', messageRoutes);

module.exports = app;
