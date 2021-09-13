const jobController = require("../controllers/job");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/userjob", auth, jobController.getAllPostedJobByUser);
router.get("/", jobController.getJobPosts);
router.post("/", auth, jobController.createJobPost);
router.put("/:id", auth, jobController.updateJobPost);
router.delete("/:id", auth, jobController.deleteJobPost);
router.get("/:id", jobController.getJobPost);

module.exports = router;
