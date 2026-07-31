const {
    setCache,
    getCache,
    deleteCache
} = require("../services/redisService");

const MEDICINE_CACHE_KEY = "medicines:all";

const cacheMedicines = async (medicines) => {
    await setCache(
        MEDICINE_CACHE_KEY,
        medicines,
        300
    );
};

const getCachedMedicines = async () => {
    return await getCache(MEDICINE_CACHE_KEY);
};

const clearMedicineCache = async () => {
    await deleteCache(MEDICINE_CACHE_KEY);
};

module.exports = {
    cacheMedicines,
    getCachedMedicines,
    clearMedicineCache
};