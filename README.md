# MediStock – AI-Powered Pharmacy Order & Inventory Management System

## 📌 Project Overview

MediStock is an AI-powered Pharmacy Order & Inventory Management System developed using Node.js, Express.js, PostgreSQL (Supabase), Redis, and Groq AI. The system helps pharmacies efficiently manage medicines, inventory, customer orders, and AI-based medicine recommendations. It follows the MVC architecture and includes Redis caching, event-driven notifications, centralized logging, and a simple React frontend.

---

## 🚀 Features

- Medicine Inventory Management
- Order Processing
- Inventory Tracking
- Redis Caching
- Redis Locking for Concurrent Orders
- Event-Driven Low Stock Notifications
- AI Medicine Recommendation
- AI Chatbot using Groq AI
- Winston Logging
- Centralized Error Handling
- RESTful APIs
- React Frontend

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Supabase)
- Redis
- Winston Logger
- EventEmitter
- Groq AI
- REST API

### Frontend
- React.js
- Axios
- CSS

### Tools
- Docker
- Git & GitHub
- Postman

---

## 📂 Project Structure

```text
MediStock
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── models
│   │   ├── middleware
│   │   ├── cache
│   │   ├── events
│   │   ├── utils
│   │   ├── ai
│   │   ├── chat
│   │   ├── app.js
│   │   └── server.js
│   ├── database
│   ├── docs
│   ├── logs
│   ├── package.json
│   └── .env
│
└── frontend
```

---

## 🗄️ Database

### Tables

- Users
- Categories
- Medicines
- Orders
- Order Items

### Database Features

- Primary Keys
- Foreign Keys
- Constraints
- SQL Functions
- Views
- Indexes
- Seed Data

---

## 🏗️ Architecture

```text
Frontend / Postman
        │
        ▼
 Express Server
        │
        ▼
     Routes
        │
        ▼
  Controllers
        │
        ▼
    Services
        │
        ▼
     Models
        │
        ▼
 PostgreSQL Database
        │
        ▼
Redis • Events • AI
```

---

## 🤖 AI Integration

MediStock integrates **Groq AI** to provide an intelligent healthcare assistant. Users can describe symptoms in natural language, and the chatbot suggests commonly used over-the-counter medicines along with general health guidance. The chatbot is implemented as a separate module, ensuring that the core pharmacy management functionality remains unaffected.

### AI Workflow

```text
User
   │
   ▼
React Chatbot
   │
   ▼
POST /api/chat
   │
   ▼
Chat Controller
   │
   ▼
Chat Service
   │
   ▼
Groq API
   │
   ▼
AI Response
```

---

## ⚡ Redis Integration

Redis is used for:

- Caching frequently accessed medicine data.
- Improving API response time.
- Preventing concurrent stock updates during order placement using Redis locking.

---

## 🔔 Event-Driven Processing

When medicine stock falls below the configured threshold, an event is triggered automatically to notify the system.

```text
Update Stock
      │
      ▼
Stock Below Threshold
      │
      ▼
Event Triggered
      │
      ▼
Notification
```

---

## 📡 REST APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/medicines | Add Medicine |
| GET | /api/medicines | Get Medicines |
| PATCH | /api/medicines/stock | Update Medicine Stock |
| POST | /api/orders | Place Order |
| GET | /api/orders/:id | Get Order Details |
| GET | /api/alerts/low-stock | Get Low Stock Medicines |
| GET | /api/recommendations | AI Medicine Recommendation |
| POST | /api/chat | AI Chatbot |

---

## 📝 Logging

The application uses Winston Logger to maintain logs.

- combined.log – Stores application logs.
- error.log – Stores error logs.

---

## ❌ Error Handling

A centralized Express error middleware handles all application errors and returns structured JSON responses without crashing the server.

Example:

```json
{
    "success": false,
    "message": "Medicine not found"
}
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Redis (Docker)

```bash
docker start medistock-redis
```

---

## 🎯 Key Highlights

- MVC Architecture
- PostgreSQL Database
- Redis Caching
- Redis Locking
- Event-Driven Programming
- RESTful APIs
- AI Chatbot using Groq AI
- AI Medicine Recommendation
- Professional Logging
- Centralized Error Handling
- React Frontend

---

## 🔮 Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Online Payment Integration
- Email & SMS Notifications
- Barcode Scanner
- QR Code Billing
- Admin Dashboard
- Analytics Dashboard
- Docker Compose
- Kubernetes Deployment

---

## 👨‍💻 Developed By

**Bhavish Rai** and **Srijan A R**

Department of Computer Science & Engineering

Sahyadri College of Engineering & Management

---

## 📄 License

This project is developed for educational and academic purposes.
