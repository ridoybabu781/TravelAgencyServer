const express = require("express");
const User = require("../middleware/User");
const {
  payBill,
  fail,
  success,
  cancel,
  COD,
} = require("../controllers/payment.controller");
const PaymentRouter = express.Router();

PaymentRouter.post("/cod/:id", User, COD);
PaymentRouter.post("/payBill/:id", User, payBill);
PaymentRouter.post("/success", success);
PaymentRouter.post("/fail", fail);
PaymentRouter.post("/cancel", cancel);

module.exports = PaymentRouter;
