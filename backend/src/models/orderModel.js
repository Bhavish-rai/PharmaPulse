const pool = require("../config/db");

const createOrder = async (userId, totalAmount, client = pool) => {
    const query = `
        INSERT INTO orders
        (user_id, total_amount)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const result = await client.query(query, [
        userId,
        totalAmount
    ]);

    return result.rows[0];
};

const addOrderItem = async (
    orderId,
    medicineId,
    quantity,
    price,
    client = pool
) => {
    const query = `
        INSERT INTO order_items
        (order_id, medicine_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const result = await client.query(query, [
        orderId,
        medicineId,
        quantity,
        price
    ]);

    return result.rows[0];
};

const getOrderById = async (orderId) => {
    const query = `
        SELECT
            o.*,
            oi.medicine_id,
            oi.quantity,
            oi.price
        FROM orders o
        LEFT JOIN order_items oi
            ON o.order_id = oi.order_id
        WHERE o.order_id = $1
    `;

    const result = await pool.query(query, [orderId]);

    return result.rows;
};

module.exports = {
    createOrder,
    addOrderItem,
    getOrderById
};