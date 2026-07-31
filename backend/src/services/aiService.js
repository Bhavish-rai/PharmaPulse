const medicineModel = require("../models/medicineModel");

const recommendByMedicine = async (medicineId) => {
    const medicine =
        await medicineModel.getMedicineById(
            medicineId
        );

    if (!medicine) {
        throw new Error("Medicine not found");
    }

    const medicines =
        await medicineModel.getMedicines({
            category: medicine.category
        });

    return medicines.filter(
        item =>
            item.medicine_id !== medicine.medicine_id
    );
};

const recommendBySymptoms = async (symptoms) => {
    const medicines =
        await medicineModel.getMedicines({});

    const keywords = symptoms
        .toLowerCase()
        .split(",");

    return medicines.filter(medicine =>
        keywords.some(keyword =>
            medicine.name
                .toLowerCase()
                .includes(keyword.trim())
        )
    );
};

module.exports = {
    recommendByMedicine,
    recommendBySymptoms
};