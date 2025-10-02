const Travel = require("../models/travel.model");
const User = require("../models/user.model");
const cloud = require("../utils/cloudinary");
const fs = require("fs");
const createError = require("http-errors");

// Add a new travel
const addTravel = async (req, res, next) => {
  try {
    const { title, description, price, location, duration, categories, type } =
      req.body;
    const agencyId = req.userId;

    if (
      !title ||
      !description ||
      !price ||
      !categories ||
      !location ||
      !duration
    ) {
      return next(createError(400, "All fields are required"));
    }
    console.log(req.body);

    const agency = await User.findById(agencyId);
    if (!agency || agency.role !== "agency") {
      return next(createError(403, "You're not authorized to add travel"));
    }

    if (!agency.address && !agency.phone) {
      return next(
        createError(404),
        "Address and Phone Number not added to Your Profile"
      );
    }

    console.log(agency.address, agency.phone);

    const travel = new Travel({
      agencyId,
      title,
      type,
      description,
      price,
      location,
      duration,
      categories,
      email: agency.email,
      number: agency.phone,
      contactAddress: agency.address,
    });

    await travel.save();
    res.status(201).json({ message: "Travel created", travel });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Add travel image (Cloudinary + Multer)
const addTravelImages = async (req, res, next) => {
  try {
    const travel = await Travel.findById(req.params.id);
    if (!travel) return next(createError(404, "Travel not found"));

    const result = await cloud.uploader.upload(req.file.path, {
      folder: "travelImages",
    });

    fs.unlinkSync(req.file.path);

    travel.images.push(result.secure_url);
    await travel.save();

    res
      .status(200)
      .json({ message: "Image uploaded", image: result.secure_url });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all travels (paginated)
const getTravels = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const travels = await Travel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ travels, page });
  } catch (error) {
    next(error);
  }
};

// Get single travel by ID
const getTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findById(req.params.id);

    if (!travel) return next(createError(404, "Travel not found"));

    res.status(200).json({ travel });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get travels of current agency
const getAgencyTravels = async (req, res, next) => {
  try {
    const agencyId = req.userId;
    const travels = await Travel.find({ agencyId }).sort({ createdAt: -1 });

    res.status(200).json({ travels });
  } catch (error) {
    next(error);
  }
};

// Search travels
const searchTravels = async (req, res, next) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await Travel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit);

    if (result.length === 0) return next(createError(404, "No results found"));
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// Update travel
const updateTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!travel) return next(createError(404, "Travel not found"));

    res.status(200).json({ message: "Travel updated", travel });
  } catch (error) {
    next(error);
  }
};

// Delete travel
const deleteTravel = async (req, res, next) => {
  try {
    const travel = await Travel.findByIdAndDelete(req.params.id);
    if (!travel) return next(createError(404, "Travel not found"));

    res.status(200).json({ message: "Travel deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTravel,
  addTravelImages,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
  getAgencyTravels,
  searchTravels,
};
