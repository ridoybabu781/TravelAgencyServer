const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

// Config
const config = require("./config");

// Routes
const TravelRouter = require("./routes/travel.routes");
const BookingRouter = require("./routes/booking.routes");
const PaymentRouter = require("./routes/payment.routes");
const userRouter = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", userRouter);
app.use("/api/travel", TravelRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/payment", PaymentRouter);

app.use("/", (req, res) => {
  res.send("Home Page");
});

// Centralized error handler
app.use(errorHandler);

// DB connection
config.db();

module.exports = app;
