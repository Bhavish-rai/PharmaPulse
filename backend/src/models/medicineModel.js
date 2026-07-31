const pool = require("../config/db");

const addMedicine = async ({
    medicine_name,
    category_id,
    manufacturer,
    stock,
    price,
    expiry_date,
    threshold
}) => {
    const query = `
        INSERT INTO medicines
        (
            medicine_name,
            category_id,
            manufacturer,
            stock,
            price,
            expiry_date,
            threshold
        )
        VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 20))
        RETURNING *;
    `;

    const values = [
        medicine_name,
        category_id,
        manufacturer,
        stock,
        price,
        expiry_date,
        threshold
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getMedicines = async ({ category, search }) => {
    let query = `
        SELECT
            m.medicine_id,
            m.medicine_name,
            m.category_id,
            c.category_name,
            m.manufacturer,
            m.stock,
            m.price,
            m.expiry_date,
            m.threshold,
            m.created_at
        FROM medicines m
        JOIN categories c
            ON m.category_id = c.category_id
        WHERE 1 = 1
    `;

    const values = [];

    if (category) {
        values.push(category);

        query += `
            AND c.category_name ILIKE $${values.length}
        `;
    }

    if (search) {
        values.push(`%${search}%`);

        query += `
            AND m.medicine_name ILIKE $${values.length}
        `;
    }

    query += `
        ORDER BY m.medicine_id DESC
    `;

    const result = await pool.query(query, values);

    return result.rows;
};

const getMedicineById = async (medicineId) => {
    const query = `
        SELECT
            m.medicine_id,
            m.medicine_name,
            m.category_id,
            c.category_name,
            m.manufacturer,
            m.stock,
            m.price,
            m.expiry_date,
            m.threshold,
            m.created_at
        FROM medicines m
        JOIN categories c
            ON m.category_id = c.category_id
        WHERE m.medicine_id = $1;
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