const medicineService =
    require("../services/medicineService");

const addMedicine = async (req, res, next) => {
    try {
        const medicine =
            await medicineService.addMedicine(req.body);

        res.status(201).json({
            success: true,
            message: "Medicine added successfully",
            data: medicine
        });
    } catch (error) {
        next(error);
    }
};

const getMedicines = async (req, res, next) => {
    try {
        const result =
            await medicineService.getMedicines(req.query);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const updateStock = async (req, res, next) => {
    try {
        const {
            medicineId,
            quantity
        } = req.body;

        const medicine =
            await medicineService.updateStock(
                medicineId,
                quantity
            );

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: medicine
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addMedicine,
    getMedicines,
    updateStock
};