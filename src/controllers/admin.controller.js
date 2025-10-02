const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(createError(404, "Something is missing"));
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
      role: "admin",
    });

    await user.save();

    res.status(201).json({
      message: "Admin Created Successfull. Go to login page for login",
    });
  } catch (error) {
    next(error);
  }
};

const getPendingAgencies = async (req, res, next) => {
  try {
    const userId = req.userId;
    const admin = await User.findById(userId);
    if (admin.role !== "admin") {
      return next(createError(400, "You're not allowed to do this"));
    }

    const agencies = await User.find({
      $and: [{ isAgent: "pending" }, { role: "agency" }],
    });

    if (!agencies) {
      return next(createError(404, "No agency request here"));
    }

    res.status(200).json({ message: "Agency Fetched Successfully", agencies });
  } catch (error) {
    next(error);
  }
};

const approveAgency = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { agencyId } = req.params;

    const admin = await User.findById(userId);
    if (admin.role !== "admin") {
      return next(createError(400, "You're not allowed to do this"));
    }

    const agency = await User.findByIdAndUpdate(
      agencyId,
      {
        isAgent: "yes",
      },
      { new: true }
    );

    if (!agency) {
      return next(createError(400, "Agency Updation failed"));
    }

    res.status(200).json({ agency, message: "Agency updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const rejectAgency = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { agencyId } = req.params;

    const admin = await User.findById(userId);
    if (admin.role !== "admin") {
      return next(createError(400, "You're not allowed to do this"));
    }

    const agency = await User.findByIdAndDelete(agencyId);

    if (!agency) {
      return next(createError(400, "Agency deletion failed"));
    }

    res
      .status(200)
      .json({ agency, message: "Agency request rejected Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  approveAgency,
  rejectAgency,
  getPendingAgencies,
};
