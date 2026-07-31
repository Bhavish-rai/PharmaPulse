const pool = require("../config/db");

const getLowStockMedicines = async (
    req,
    res,
    next
) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM medicines
            WHERE stock < 10
            ORDER BY stock ASC
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