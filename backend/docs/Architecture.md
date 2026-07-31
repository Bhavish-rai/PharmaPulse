# MediStock AI Architecture

```
Frontend
     │
     ▼
Node.js + Express
     │
     ▼
Business Logic (MVC)
     │
     ▼
PostgreSQL
     │
     ▼
Redis Cache
```

## Components

### Frontend

User interface for pharmacists and customers.

### Backend

Handles business logic and REST APIs.

### PostgreSQL

Stores users, medicines, categories, orders and order items.

### Redis

Used for:

- Caching medicines
- Concurrency handling
- Queue management

### Event Driven

Low stock notifications are generated whenever stock falls below the threshold.
