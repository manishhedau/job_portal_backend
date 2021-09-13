const express = require("express");
const auth = require("../middleware/auth");
const applyJobController = require("../controllers/applyJob");


const router = express.Router();

router.get("/:id", auth, applyJobController.getApplyJob);
router.post("/", auth, applyJobController.applyToJob);
router.patch("/:id", auth, applyJobController.apply);

module.exports = router;