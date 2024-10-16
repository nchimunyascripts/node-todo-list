const mongoose = require('mongoose');
// const redis = require('redis');
const session = require('express-session');
// const connectRedis = require('connect-redis').default;

// Create a Redis client and enable legacy mode for Redis v4+
// const redisClient = redis.createClient({
//     url: process.env.REDIS_URL,
//     legacyMode: true, // Ensures compatibility with Redis v4
// });

// redisClient.connect().catch(console.error);

// Initialize Redis Store
// const RedisStore = connectRedis(session);

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Handle Redis connection
        // redisClient.on('connect', () => {
        //     console.log('Redis connected');
        // });

        // Return both the Redis client and Redis store
        // return { redisClient, RedisStore };
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
