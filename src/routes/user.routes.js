const {
  createAdmin,
  approveAgency,
  rejectAgency,
  getPendingAgencies,
} = require("../controllers/admin.controller");
const {
  sendCode,
  createUser,
  login,
  profile,
  updateProfile,
  updateProfilePicture,
  forgetPasswordCode,
  forgetPassword,
  updatePassword,
  logout,
  updateCoverPicture,
  getAllAgencies,
  deleteProfile,
  blockProfile,
  unBlockProfile,
  getBlockedProfile,
} = require("../controllers/user.controller");
const validation = require("../middleware/validation");

const userCheck = require("../middleware/User");
const upload = require("../utils/multer");
const {
  createUserSchema,
  loginUserSchema,
} = require("../validation/user.validate");
const router = require("express").Router();

router.post("/sendCode", sendCode);
router.post("/register", validation(createUserSchema), createUser);
router.post("/login", validation(loginUserSchema), login);
router.get("/profile", userCheck, profile);
router.put("/updateProfile", userCheck, updateProfile);
router.put("/updatePassword", userCheck, updatePassword);
router.put(
  "/updateProfilePicture",
  userCheck,
  upload.single("profilePic"),
  updateProfilePicture
);
router.put(
  "/updateCoverPicture",
  userCheck,
  upload.single("coverPic"),
  updateCoverPicture
);
router.post("/sendForgetPassCode", forgetPasswordCode);
router.post("/forgetPassword", forgetPassword);
router.post("/logout", userCheck, logout);

// Admin Area

router.post("/admin/rr/rsc-create-bro-admin", createAdmin);

router.get("/getAllAgencies", userCheck, getAllAgencies);

router.delete("/deleteProfile/:id", userCheck, deleteProfile);
router.put("/blockProfile/:id", userCheck, blockProfile);
router.put("/unBlockProfile/:id", userCheck, unBlockProfile);
router.get("/getBlockedProfiles", userCheck, getBlockedProfile);

router.get("/getPendingAgencies", userCheck, getPendingAgencies);
router.post("/approveAgency/:agencyId", userCheck, approveAgency);
router.post("/rejectAgency/:agencyId", userCheck, rejectAgency);

module.exports = router;
