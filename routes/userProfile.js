const express = require("express");
const userProfileController = require("../controllers/userprofile");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", auth, userProfileController.getUserProfile);
router.post("/", auth, userProfileController.setUserProfile);
router.put("/", auth, userProfileController.updateUserProfile);

module.exports = router;