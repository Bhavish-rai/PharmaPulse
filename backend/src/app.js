const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");
const alertRoutes = require("./routes/alertRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const errorHandler = require("./middleware/errorHandler");
const chatRoutes = require("./chat/chatRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MediStock API is running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        service: "MediStock Backend"
    });
});

app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use(errorHandler);

module.exports = app;