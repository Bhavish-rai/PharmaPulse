const pool = require("../config/db");

const addMedicine = async ({ name, category, stock, price }) => {
    const query = `
        INSERT INTO medicines
        (name, category, stock, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [name, category, stock, price];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getMedicines = async ({ category, search }) => {
    let query = `
        SELECT *
        FROM medicines
        WHERE 1=1
    `;

    const values = [];

    if (category) {
        values.push(category);
        query += ` AND category = $${values.length}`;
    }

    if (search) {
        values.push(`%${search}%`);
        query += ` AND name ILIKE $${values.length}`;
    }

    query += ` ORDER BY medicine_id DESC`;

    const result = await pool.query(query, values);

    return result.rows;
};

const getMedicineById = async (medicineId) => {
    const query = `
        SELECT *
        FROM medicines
        WHERE medicine_id = $1
    `;

    const result = await pool.query(query, [medicineId]);

    return result.rows[0];
};

const updateStock = async (medicineId, quantity) => {
    const query = `
        UPDATE medicines
        SET stock = stock + $1
        WHERE medicine_id = $2
        RETURNING *;
    `;

    const result = await pool.query(query, [
        quantity,
        medicineId
    ]);

    return result.rows[0];
};

module.exports = {
    addMedicine,
    getMedicines,
    getMedicineById,
    updateStock
};