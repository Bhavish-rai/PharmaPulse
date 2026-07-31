# API Documentation

## Add Medicine

POST /api/medicines

Adds a new medicine.

---

## Update Stock

PUT /api/medicines/:id/stock

Updates medicine stock.

---

## Get Medicines

GET /api/medicines

Returns all medicines.

---

## Place Order

POST /api/orders

Creates a new order.

---

## Get Order Details

GET /api/orders/:id

Returns order details.

---

## Low Stock Alert

GET /api/alerts/low-stock

Returns medicines below threshold.

---

## AI Recommendation

POST /api/recommendations

Returns alternative medicine recommendations.
