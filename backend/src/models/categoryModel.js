const pool = require("../config/db");

const getCategories = async () => {
    const result = await pool.query(`
        SELECT *
        FROM categories
        ORDER BY name
    `);

    return result.rows;
};

module.exports = {
    getCategories
};