const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    travelerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    travelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    tourLocation: {
      type: String,
      required: true,
    },
    numberOfTraveler: {
      type: Number,
      required: true,
      default: 1,
    },
    tourDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentMethod: { type: String, enum: ["COD", "SSLCommerz"] },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
