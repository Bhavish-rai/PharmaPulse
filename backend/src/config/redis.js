const Redis = require("ioredis");

let redis = null;

try {
    redis = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,

        // Stop retrying after the first failure
        retryStrategy() {
            return null;
        },

        maxRetriesPerRequest: 1,
    });

    redis.on("connect", () => {
        console.log("✅ Redis connected successfully");
    });

    redis.on("error", () => {
        console.log("⚠ Redis not available. Running without Redis.");
    });

} catch (err) {
    console.log("⚠ Redis initialization failed.");
}

module.exports = redis;