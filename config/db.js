const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');

// Create a Redis client with proper options for Redis v4+
const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true, // Ensures compatibility with Redis v4
    retryStrategy: (options) => {
        // Implement a retry strategy to handle connection errors
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_attempts   
 > 10) {
            return new Error('Reached maximum retry attempts');
        }
        return Math.min(options.attempt * 2, 5000); // Exponential backoff with a maximum delay of 5 seconds
    },
});

// Connect to Redis and handle errors gracefully
redisClient.connect().catch((err) => {
    console.error('Error connecting to Redis:', err);
    process.exit(1);
});

// Initialize Redis Store
const RedisStore = connectRedis(session);

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');


        // Return both the Redis client and Redis store
        return { redisClient, RedisStore };
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;