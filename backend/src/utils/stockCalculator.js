const {
    LOW_STOCK_THRESHOLD
} = require("./constants");

const calculateRemainingStock = (
    currentStock,
    quantity
) => {
    return Number(currentStock) - Number(quantity);
};

const isLowStock = (stock) => {
    return Number(stock) <= LOW_STOCK_THRESHOLD;
};

const isOutOfStock = (stock) => {
    return Number(stock) <= 0;
};

const canFulfillOrder = (
    currentStock,
    requestedQuantity
) => {
    return (
        Number(currentStock) >=
        Number(requestedQuantity)
    );
};

const getStockStatus = (stock) => {
    const numericStock = Number(stock);

    if (numericStock <= 0) {
        return "OUT_OF_STOCK";
    }

    if (
        numericStock <=
        LOW_STOCK_THRESHOLD
    ) {
        return "LOW_STOCK";
    }

    return "AVAILABLE";
};

module.exports = {
    calculateRemainingStock,
    isLowStock,
    isOutOfStock,
    canFulfillOrder,
    getStockStatus
};