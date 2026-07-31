const redis = require("../config/redis");

const setCache = async (key, value, expiry = 300) => {
    await redis.set(
        key,
        JSON.stringify(value),
        "EX",
        expiry
    );
};

const getCache = async (key) => {
    const data = await redis.get(key);

    if (!data) {
        return null;
    }

    return JSON.parse(data);
};

const deleteCache = async (key) => {
    await redis.del(key);
};

module.exports = {
    setCache,
    getCache,
    deleteCache
};