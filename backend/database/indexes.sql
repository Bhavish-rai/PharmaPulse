-- ==========================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ==========================================

-- Search medicine by name
CREATE INDEX idx_medicine_name
ON medicines(medicine_name);

-- Filter medicines by category
CREATE INDEX idx_category
ON medicines(category_id);

-- Frequently check stock
CREATE INDEX idx_stock
ON medicines(stock);

-- Fetch orders of a user
CREATE INDEX idx_order_user
ON orders(user_id);

-- Filter orders by status
CREATE INDEX idx_order_status
ON orders(status);

-- Join order_items with orders
CREATE INDEX idx_order_items_order
ON order_items(order_id);

-- Join order_items with medicines
CREATE INDEX idx_order_items_medicine
ON order_items(medicine_id);