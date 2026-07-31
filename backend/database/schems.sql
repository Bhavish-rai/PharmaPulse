-- ==========================================
-- DATABASE: MediStock AI
-- Pharmacy Order & Inventory Management
-- ==========================================

-- ==========================
-- USERS TABLE
-- ==========================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- CATEGORIES TABLE
-- ==========================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- ==========================
-- MEDICINES TABLE
-- ==========================

CREATE TABLE medicines (
    medicine_id SERIAL PRIMARY KEY,

    category_id INT NOT NULL,

    medicine_name VARCHAR(100) NOT NULL,

    manufacturer VARCHAR(100) NOT NULL,

    stock INT NOT NULL CHECK(stock >= 0),

    price DECIMAL(10,2) NOT NULL CHECK(price > 0),

    expiry_date DATE NOT NULL,

    threshold INT DEFAULT 20 CHECK(threshold >= 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category
    FOREIGN KEY(category_id)
    REFERENCES categories(category_id)
    ON DELETE RESTRICT
);

-- ==========================
-- ORDERS TABLE
-- ==========================

CREATE TABLE orders (

    order_id SERIAL PRIMARY KEY,

    user_id INT NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL CHECK(total_amount >= 0),

    status VARCHAR(20)
    DEFAULT 'Pending'
    CHECK(status IN ('Pending','Completed','Cancelled')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- ==========================
-- ORDER ITEMS TABLE
-- ==========================

CREATE TABLE order_items (

    order_item_id SERIAL PRIMARY KEY,

    order_id INT NOT NULL,

    medicine_id INT NOT NULL,

    quantity INT NOT NULL CHECK(quantity > 0),

    price DECIMAL(10,2) NOT NULL CHECK(price > 0),

    subtotal DECIMAL(10,2) NOT NULL CHECK(subtotal >= 0),

    CONSTRAINT fk_order
    FOREIGN KEY(order_id)
    REFERENCES orders(order_id)
    ON DELETE CASCADE,

    CONSTRAINT fk_medicine
    FOREIGN KEY(medicine_id)
    REFERENCES medicines(medicine_id)
    ON DELETE RESTRICT
);