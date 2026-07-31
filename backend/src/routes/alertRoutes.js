const express = require("express");

const router = express.Router();

const alertController =
    require("../controllers/alertController");

router.get(
    "/low-stock",
    alertController.getLowStockMedicines
);

module.exports = router;