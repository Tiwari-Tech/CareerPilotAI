const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Basic brute-force protection on auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many attempts, please try again later.' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');
// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler - keeps every error response as JSON instead of
// leaking Express's default HTML/stack-trace page (e.g. Multer file-size
// errors, unexpected thrown errors from controllers).
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err.message);
    // Multer errors (file too large, wrong field, etc.) are always client errors
    const isMulterError = err.name === 'MulterError';
    const status = err.status || err.statusCode || (isMulterError ? 400 : 500);
    res.status(status).json({
        message: err.message || 'Something went wrong',
    });
});

module.exports = app;
