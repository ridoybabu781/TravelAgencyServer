const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,

      default: "Travel",
    },
    images: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: [true, "Travel title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Travel description is required"],
      trim: true,
      minlength: 20,
    },
    price: {
      type: Number,
      required: [true, "Travel price is required"],
      min: 0,
    },
    location: {
      type: String,
      required: [true, "Travel location is required"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Travel duration is required"],
      min: 1,
    },
    categories: [String],

    // Contact Info
    email: String,
    number: Number,
    contactAddress: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Travel", travelSchema);
