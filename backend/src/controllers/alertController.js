const pool = require("../config/db");

const getLowStockMedicines = async (
    req,
    res,
    next
) => {
    try {
        const result = await pool.query(`
            SELECT
                medicine_id,
                medicine_name,
                category_id,
                manufacturer,
                stock,
                price,
                expiry_date,
                threshold
            FROM medicines
            WHERE stock <= threshold
            ORDER BY stock ASC;
        `);

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLowStockMedicines
};