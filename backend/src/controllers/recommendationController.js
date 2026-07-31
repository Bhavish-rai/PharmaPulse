const recommendationEngine =
    require("../ai/recommendationEngine");

const getRecommendations = async (
    req,
    res,
    next
) => {
    try {
        const {
            medicineId,
            symptoms
        } = req.query;

        const recommendations =
            await recommendationEngine
                .getRecommendations({
                    medicineId,
                    symptoms
                });

        res.status(200).json({
            success: true,
            data: recommendations
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRecommendations
};