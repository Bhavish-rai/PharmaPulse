const redis = require("../config/redis");

const setCache = async (key, value, expiry = 300) => {
    try {
        if (!redis || redis.status !== "ready") {
            return;
        }

        await redis.set(
            key,
            JSON.stringify(value),
            "EX",
            expiry
        );
    } catch (err) {
        console.log("Redis unavailable. Skipping cache.");
    }
};

const getCache = async (key) => {
    try {
        if (!redis || redis.status !== "ready") {
            return null;
        }

        const data = await redis.get(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data);

    } catch (err) {
        console.log("Redis unavailable. Reading from database.");
        return null;
    }
};

const deleteCache = async (key) => {
    try {
        if (!redis || redis.status !== "ready") {
            return;
        }

        await redis.del(key);

    } catch (err) {
        console.log("Redis unavailable.");
    }
};

module.exports = {
    setCache,
    getCache,
    deleteCache
};