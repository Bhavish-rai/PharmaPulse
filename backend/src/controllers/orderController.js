const orderService =
    require("../services/orderService");

const placeOrder = async (req, res, next) => {
    try {
        const { user_id, medicine_list } =
            req.body;

        const result =
            await orderService.placeOrder(
                user_id,
                medicine_list
            );

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const getOrderDetails = async (
    req,
    res,
    next
) => {
    try {
        const { orderId } = req.params;

        const order =
            await orderService.getOrderDetails(
                orderId
            );

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    placeOrder,
    getOrderDetails
};