const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { store } = require('./config/db');

dotenv.config();
const app = express();

app.use(session({
    store,
    secret: process.env.SESSION_SECRET || "makeittillyoucananymore32345",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure: true in production when using HTTPS
}))
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})