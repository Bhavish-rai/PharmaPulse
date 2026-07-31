# MediStock AI - Database Design

## Overview

The MediStock AI database is designed using PostgreSQL following normalization principles.

The database manages:

- Users
- Medicine Categories
- Medicines
- Orders
- Order Items

---

## Tables

### Users

Stores customer information.

| Column | Type |
|---------|------|
| user_id | SERIAL PRIMARY KEY |
| full_name | VARCHAR(100) |
| email | VARCHAR(100) UNIQUE |
| phone | VARCHAR(15) UNIQUE |

---

### Categories

Stores medicine categories.

| Column | Type |
|---------|------|
| category_id | SERIAL PRIMARY KEY |
| category_name | VARCHAR(50) |

---

### Medicines

Stores medicine inventory.

| Column | Type |
|---------|------|
| medicine_id | SERIAL PRIMARY KEY |
| category_id | FOREIGN KEY |
| medicine_name | VARCHAR(100) |
| manufacturer | VARCHAR(100) |
| stock | INTEGER |
| price | DECIMAL |
| expiry_date | DATE |
| threshold | INTEGER |

---

### Orders

Stores customer orders.

| Column | Type |
|---------|------|
| order_id | SERIAL PRIMARY KEY |
| user_id | FOREIGN KEY |
| total_amount | DECIMAL |
| status | VARCHAR(20) |

---

### Order Items

Stores medicines inside each order.

| Column | Type |
|---------|------|
| order_item_id | SERIAL PRIMARY KEY |
| order_id | FOREIGN KEY |
| medicine_id | FOREIGN KEY |
| quantity | INTEGER |
| price | DECIMAL |
| subtotal | DECIMAL |

---

## Relationships

- One User → Many Orders
- One Category → Many Medicines
- One Order → Many Order Items
- One Medicine → Many Order Items

---

## Optimization

The database uses indexes on:

- Medicine Name
- Category
- Stock
- Order Status
- User ID

These indexes improve query performance.