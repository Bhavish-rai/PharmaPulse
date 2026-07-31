-- ============================================================
-- MediStock AI
-- SQL FUNCTIONS
-- ============================================================

---------------------------------------------------------------
-- 1. TOTAL REVENUE
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_total_revenue()
RETURNS DECIMAL AS
$$
DECLARE
    revenue DECIMAL;
BEGIN
    SELECT COALESCE(SUM(total_amount),0)
    INTO revenue
    FROM orders
    WHERE status = 'Completed';

    RETURN revenue;
END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 2. TOTAL MEDICINES
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_total_medicines()
RETURNS INTEGER AS
$$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM medicines;

    RETURN total;
END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 3. COMPLETED ORDERS
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_completed_orders()
RETURNS INTEGER AS
$$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM orders
    WHERE status = 'Completed';

    RETURN total;
END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 4. LOW STOCK MEDICINES
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_low_stock_medicines()
RETURNS TABLE (
    medicine_name VARCHAR,
    stock INTEGER,
    threshold INTEGER
)
AS
$$
BEGIN
    RETURN QUERY

    SELECT
        m.medicine_name,
        m.stock,
        m.threshold

    FROM medicines m

    WHERE m.stock <= m.threshold

    ORDER BY m.stock ASC;

END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 5. TOP SELLING MEDICINES
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_top_selling_medicines()
RETURNS TABLE (
    medicine_name VARCHAR,
    total_quantity BIGINT
)
AS
$$
BEGIN
    RETURN QUERY

    SELECT
        m.medicine_name,
        SUM(oi.quantity) AS total_quantity

    FROM medicines m

    JOIN order_items oi
    ON m.medicine_id = oi.medicine_id

    GROUP BY m.medicine_name

    ORDER BY total_quantity DESC;

END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 6. TOTAL STOCK VALUE
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_total_inventory_value()
RETURNS DECIMAL AS
$$
DECLARE
    inventory_value DECIMAL;
BEGIN

    SELECT COALESCE(SUM(stock * price),0)

    INTO inventory_value

    FROM medicines;

    RETURN inventory_value;

END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------
-- 7. MEDICINES BY CATEGORY
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_medicines_by_category(category VARCHAR)
RETURNS TABLE(
    medicine_name VARCHAR,
    manufacturer VARCHAR,
    stock INTEGER,
    price DECIMAL
)
AS
$$
BEGIN

    RETURN QUERY

    SELECT

        m.medicine_name,
        m.manufacturer,
        m.stock,
        m.price

    FROM medicines m

    JOIN categories c
    ON m.category_id = c.category_id

    WHERE c.category_name = category

    ORDER BY m.medicine_name;

END;
$$
LANGUAGE plpgsql;