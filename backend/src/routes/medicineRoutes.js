const express = require("express");

const router = express.Router();

const medicineController =
    require("../controllers/medicineController");

const validateRequest =
    require("../middleware/validateRequest");

router.post(
    "/",
    validateRequest([
        "name",
        "category",
        "stock",
        "price"
    ]),
    medicineController.addMedicine
);

router.get(
    "/",
    medicineController.getMedicines
);

router.patch(
    "/stock",
    validateRequest([
        "medicineId",
        "quantity"
    ]),
    medicineController.updateStock
);

module.exports = router;