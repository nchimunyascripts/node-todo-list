const mongoose = require('mongoose');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

// Create a Redis client and enable legacy mode for Redis v4+
const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true,          
});

redisClient.connect().catch((err) => console.error('Redis connection error:', err));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        redisClient.on('ready', () => {
            console.log('Redis connected');
        });

        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });
        const store = new RedisStore({ client: redisClient });
        return { redisClient, store };
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
