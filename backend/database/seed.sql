-- ===========================
-- INSERT CATEGORIES
-- ===========================

INSERT INTO categories (category_name, description) VALUES
('Painkiller', 'Medicines used for pain relief'),
('Antibiotic', 'Medicines used to treat bacterial infections'),
('Vitamin', 'Vitamin supplements'),
('Diabetes', 'Medicines for diabetes management'),
('Skin Care', 'Skin treatment medicines');

-- ===========================
-- INSERT USERS
-- ===========================

INSERT INTO users (full_name, email, phone) VALUES
('Rahul Sharma', 'rahul@gmail.com', '9876543210'),
('Ananya Rao', 'ananya@gmail.com', '9876543211'),
('Kiran Kumar', 'kiran@gmail.com', '9876543212'),
('Priya Singh', 'priya@gmail.com', '9876543213'),
('Arjun Patel', 'arjun@gmail.com', '9876543214');

-- ===========================
-- INSERT MEDICINES
-- ===========================

INSERT INTO medicines
(category_id, medicine_name, manufacturer, stock, price, expiry_date, threshold)
VALUES
(1,'Crocin 500','GSK',120,25.00,'2027-05-20',20),
(1,'Dolo 650','Micro Labs',150,30.00,'2027-08-12',20),
(2,'Azithromycin','Cipla',80,120.00,'2026-11-15',15),
(2,'Amoxicillin','Sun Pharma',60,95.00,'2026-09-25',15),
(3,'Vitamin C','Himalaya',200,150.00,'2028-02-10',30),
(4,'Metformin','Dr. Reddy''s',90,85.00,'2027-06-18',20),
(5,'Cetaphil Cream','Galderma',40,350.00,'2027-12-01',10);

-- ===========================
-- INSERT ORDERS
-- ===========================

INSERT INTO orders
(user_id,total_amount,status)
VALUES
(1,145.00,'Completed'),
(2,350.00,'Pending'),
(3,205.00,'Completed');

-- ===========================
-- INSERT ORDER ITEMS
-- ===========================

INSERT INTO order_items
(order_id,medicine_id,quantity,price,subtotal)
VALUES
(1,1,1,25.00,25.00),
(1,2,4,30.00,120.00),
(2,7,1,350.00,350.00),
(3,3,1,120.00,120.00),
(3,6,1,85.00,85.00);