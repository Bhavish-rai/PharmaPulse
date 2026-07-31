const pool = require("../config/db");

const createOrder = async (
    userId,
    totalAmount,
    client = pool
) => {
    const query = `
        INSERT INTO orders
        (
            user_id,
            total_amount,
            status
        )
        VALUES ($1, $2, 'Pending')
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
    subtotal,
    client = pool
) => {
    const query = `
        INSERT INTO order_items
        (
            order_id,
            medicine_id,
            quantity,
            price,
            subtotal
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await client.query(query, [
        orderId,
        medicineId,
        quantity,
        price,
        subtotal
    ]);

    return result.rows[0];
};

const getOrderById = async (orderId) => {
    const query = `
        SELECT
            o.order_id,
            o.user_id,
            u.full_name,
            o.total_amount,
            o.status,
            o.created_at,
            oi.order_item_id,
            oi.medicine_id,
            m.medicine_name,
            oi.quantity,
            oi.price,
            oi.subtotal
        FROM orders o
        JOIN users u
            ON o.user_id = u.user_id
        LEFT JOIN order_items oi
            ON o.order_id = oi.order_id
        LEFT JOIN medicines m
            ON oi.medicine_id = m.medicine_id
        WHERE o.order_id = $1
        ORDER BY oi.order_item_id;
    `;

    const result = await pool.query(query, [orderId]);

    return result.rows;
};

module.exports = {
    createOrder,
    addOrderItem,
    getOrderById
};