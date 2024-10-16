const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;

// Create a Redis client and enable legacy mode for Redis v4+
const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true,          
});

// Connect Redis client
redisClient.connect().catch((err) => console.error('Redis connection error:', err));

// Initialize MongoDB and Redis connections
const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Handle Redis connection status
        redisClient.on('ready', () => {
            console.log('Redis connected');
        });

        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });

        // Return both the Redis client and Redis store
        const store = new RedisStore({ client: redisClient });

        return { redisClient, store };
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);  // Exit the process with failure code
    }
};

module.exports = connectDB;