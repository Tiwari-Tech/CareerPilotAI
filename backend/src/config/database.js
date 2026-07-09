const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to Database:', error.message);
        // Rethrow so the caller (server.js) knows startup failed and can
        // stop the process instead of listening on a broken DB connection.
        throw error;
    }
}

module.exports = connectDB;
