const aiService = require("../services/aiService");

const getRecommendations = async ({
    medicineId,
    symptoms
}) => {
    if (medicineId) {
        return await aiService.recommendByMedicine(
            medicineId
        );
    }

    if (symptoms) {
        return await aiService.recommendBySymptoms(
            symptoms
        );
    }

    throw new Error(
        "medicineId or symptoms is required"
    );
};

module.exports = {
    getRecommendations
};