const medicineModel = require("../models/medicineModel");

const {
    getCachedMedicines,
    cacheMedicines,
    clearMedicineCache
} = require("../cache/medicineCache");

const addMedicine = async (medicineData) => {
    const medicine = await medicineModel.addMedicine(
        medicineData
    );

    await clearMedicineCache();

    return medicine;
};

const getMedicines = async (filters) => {
    const hasFilters =
        filters.category ||
        filters.search;

    if (!hasFilters) {
        const cached = await getCachedMedicines();

        if (cached) {
            return {
                medicines: cached,
                source: "redis"
            };
        }
    }

    const medicines =
        await medicineModel.getMedicines(filters);

    if (!hasFilters) {
        await cacheMedicines(medicines);
    }

    return {
        medicines,
        source: "database"
    };
};

const updateStock = async (medicineId, quantity) => {
    const medicine =
        await medicineModel.updateStock(
            medicineId,
            quantity
        );

    await clearMedicineCache();

    return medicine;
};

module.exports = {
    addMedicine,
    getMedicines,
    updateStock
};