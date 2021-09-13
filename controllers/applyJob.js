const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Job } = require("../models/job");
const { ApplyJob, validate, applyToJobValidate } = require("../models/applyJob");


exports.getApplyJob = async function (req, res) {
    const { id: applyJobId } = req.params;
    if (!mongoose.isValidObjectId(applyJobId)) return res.status(400).send("Invalid mongoose Id");

    const applyJob = await ApplyJob.findById(applyJobId);
    if (!applyJob) return res.status(400).send("No apply job post is found by given id.");
    res.send(applyJob);
}

exports.applyToJob = async function (req, res) {
    const error = applyToJobValidate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const { jobId, userId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(400).send("Invalid jobId.");

    const user = await User.findById(userId);
    if (!user) return res.status(400).send("Invalid userId.")

    let applyJob = new ApplyJob({
        jobId,
        applyJob: []
    });

    applyJob.applyJob.push({
        userId
    });

    applyJob = await applyJob.save();
    res.send(applyJob);
}


exports.apply = async function (req, res) {

    const { id: applyJobId } = req.params;
    if (!mongoose.isValidObjectId(applyJobId)) return res.status(400).send("Invalid mongoose Id");

    const { userId } = req.body;
    let applyJob = await ApplyJob.findById(applyJobId);
    if (!applyJob) return res.status(400).send("Invalid applyJobId.");

    const user = await User.findById(userId);
    if (!user) return res.status(400).send("Invalid userId.")

    applyJob.applyJob.push({
        userId
    });

    const newApplyJob = await ApplyJob.findByIdAndUpdate(applyJobId, applyJob, { new: true, runValidators: true });
    res.send(newApplyJob);
}
