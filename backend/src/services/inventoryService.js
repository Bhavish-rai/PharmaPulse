const pool = require("../config/db");

const checkStock = async (medicineId, quantity) => {
    const result = await pool.query(
        `
        SELECT *
        FROM medicines
        WHERE medicine_id = $1
        `,
        [medicineId]
    );

    const medicine = result.rows[0];

    if (!medicine) {
        throw new Error("Medicine not found");
    }

    return medicine.stock >= quantity;
};

const reduceStock = async (
    medicineId,
    quantity,
    client = pool
) => {
    const query = `
        UPDATE medicines
        SET stock = stock - $1
        WHERE medicine_id = $2
        AND stock >= $1
        RETURNING *;
    `;

    const result = await client.query(query, [
        quantity,
        medicineId
    ]);

    if (result.rows.length === 0) {
        throw new Error(
            "Insufficient stock or medicine not found"
        );
    }

    return result.rows[0];
};

module.exports = {
    checkStock,
    reduceStock
};