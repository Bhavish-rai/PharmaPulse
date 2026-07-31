const pool = require("../config/db");
const redis = require("../config/redis");

const orderModel =
    require("../models/orderModel");

const inventoryService =
    require("./inventoryService");

const placeOrder = async (
    userId,
    medicineList
) => {
    const lockKeys = [];

    try {
        for (const item of medicineList) {
            const key =
                `lock:medicine:${item.medicine_id}`;

            const lock = await redis.set(
                key,
                "locked",
                "NX",
                "EX",
                10
            );

            if (!lock) {
                throw new Error(
                    `Medicine ${item.medicine_id} is currently being ordered`
                );
            }

            lockKeys.push(key);
        }

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            let totalAmount = 0;

            const items = [];

            for (const item of medicineList) {
                const medicine =
                    await inventoryService.reduceStock(
                        item.medicine_id,
                        item.quantity,
                        client
                    );

                const subtotal =
                    Number(medicine.price) *
                    Number(item.quantity);

                totalAmount += subtotal;

                items.push({
                    medicine,
                    quantity: item.quantity,
                    subtotal
                });
            }

            const order =
                await orderModel.createOrder(
                    userId,
                    totalAmount,
                    client
                );

            for (const item of items) {
                await orderModel.addOrderItem(
                    order.order_id,
                    item.medicine.medicine_id,
                    item.quantity,
                    item.medicine.price,
                    item.subtotal,
                    client
                );
            }

            await client.query("COMMIT");

            return {
                order,
                totalAmount
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    } finally {
        for (const key of lockKeys) {
            await redis.del(key);
        }
    }
};

const getOrderDetails = async (orderId) => {
    return await orderModel.getOrderById(orderId);
};

module.exports = {
    placeOrder,
    getOrderDetails
};