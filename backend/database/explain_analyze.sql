-- ==========================================
-- QUERY PERFORMANCE ANALYSIS
-- ==========================================

-- Search medicine by name
EXPLAIN ANALYZE
SELECT *
FROM medicines
WHERE medicine_name = 'Crocin 500';

-- Get medicines by category
EXPLAIN ANALYZE
SELECT *
FROM medicines
WHERE category_id = 1;

-- Find completed orders
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE status = 'Completed';

-- Low stock medicines
EXPLAIN ANALYZE
SELECT *
FROM medicines
WHERE stock <= threshold;

-- Order summary with JOIN
EXPLAIN ANALYZE
SELECT
    o.order_id,
    u.full_name,
    o.total_amount
FROM orders o
JOIN users u
ON o.user_id = u.user_id;