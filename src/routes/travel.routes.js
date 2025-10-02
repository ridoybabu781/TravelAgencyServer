const express = require("express");
const TravelRouter = express.Router();

const {
  addTravelImages,
  addTravel,
  getTravels,
  getTravel,
  getAgencyTravels,
  searchTravels,
  updateTravel,
  deleteTravel,
} = require("../controllers/travel.controller");
const User = require("../middleware/User");
const upload = require("../utils/multer");
const validation = require("../middleware/validation");
const { addTravelSchema } = require("../validation/travel.validate");

TravelRouter.post("/addTravel", User, validation(addTravelSchema), addTravel);
TravelRouter.post(
  "/addImage/:id",
  upload.single("travelImage"),
  addTravelImages
);
TravelRouter.get("/getMyTravels", User, getAgencyTravels);
TravelRouter.get("/getTravels/:query", searchTravels);

TravelRouter.get("/getTravels", getTravels);
TravelRouter.get("/getTravel/:id", getTravel);
TravelRouter.put("/updateTravel/:id", User, updateTravel);
TravelRouter.delete("/deleteTravel/:id", User, deleteTravel);

module.exports = TravelRouter;
