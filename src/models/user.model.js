const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["traveler", "agency", "admin"],
      required: true,
      default: "traveler",
    },
    isAgent: {
      type: String,
      enum: ["no", "pending", "yes"],
      default: "no",
    },
    profilePic: {
      type: String,
    },
    coverPic: {
      type: String,
    },

    // Shared
    bio: {
      type: String,
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },

    // Agency-specific
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    foundedDate: String,
    teamSize: {
      type: Number,
    },
    specialization: {
      type: String,
    },
    isBlocked: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
