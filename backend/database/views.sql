-- ==========================================
-- MediStock AI
-- SQL VIEWS
-- ==========================================

------------------------------------------------
-- 1. MEDICINE INVENTORY VIEW
------------------------------------------------

CREATE OR REPLACE VIEW medicine_inventory_view AS

SELECT
    m.medicine_id,
    m.medicine_name,
    c.category_name,
    m.manufacturer,
    m.stock,
    m.price,
    m.expiry_date,
    m.threshold

FROM medicines m

JOIN categories c
ON m.category_id = c.category_id;

------------------------------------------------
-- 2. ORDER SUMMARY VIEW
------------------------------------------------

CREATE OR REPLACE VIEW order_summary_view AS

SELECT

    o.order_id,
    u.full_name,
    o.total_amount,
    o.status,
    o.created_at

FROM orders o

JOIN users u
ON o.user_id = u.user_id;

------------------------------------------------
-- 3. LOW STOCK VIEW
------------------------------------------------

CREATE OR REPLACE VIEW low_stock_view AS

SELECT

    medicine_id,
    medicine_name,
    stock,
    threshold

FROM medicines

WHERE stock <= threshold;

------------------------------------------------
-- 4. SALES REPORT VIEW
------------------------------------------------

CREATE OR REPLACE VIEW sales_report_view AS

SELECT

    m.medicine_name,

    SUM(oi.quantity) AS total_quantity,

    SUM(oi.subtotal) AS total_sales

FROM medicines m

JOIN order_items oi

ON m.medicine_id = oi.medicine_id

GROUP BY m.medicine_name

ORDER BY total_sales DESC;