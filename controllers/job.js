const mongoose = require("mongoose");
const _ = require("lodash");
const { Job, validate } = require("../models/job");
const { User } = require("../models/user");
const joiObjectid = require("joi-objectid");

exports.getJobPosts = async function (req, res) {
    const jobs = await Job.find();
    res.send(jobs);
}

exports.getAllPostedJobByUser = async function (req, res) {
    const userPostedJobs = await Job.find({ userId: req.user._id });
    res.send(userPostedJobs);
}

exports.createJobPost = async function (req, res) {
    const error = validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalida UserId, please provide validate userId");

    let jobPost = await new Job(_.pick(req.body, ["userId", "company_name", "job_title", "qualification", "yearOfExperience", "job_desc", "comapny_link", "company_description"]));
    await jobPost.save();

    res.send("Successfully added job.");
}


exports.updateJobPost = async function (req, res) {
    const { id: jobPostId } = req.params;
    if (!mongoose.isValidObjectId(jobPostId)) return res.status(400).send("Invalid mongo id.");

    const error = validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalida UserId, please provide validate userId");

    const jobPost = await Job.findByIdAndUpdate(jobPostId, _.pick(req.body, ["userId", "company_name", "job_title", "qualification", "yearOfExperience", "job_desc", "comapny_link", "company_description"]), { new: true, runValidators: true })
    res.send(jobPost);
}

exports.deleteJobPost = async function (req, res) {
    const { id: jobPostId } = req.params;
    if (!mongoose.isValidObjectId(jobPostId)) return res.status(400).send("Invalid mongo id.");

    const jobPost = await Job.findByIdAndRemove(jobPostId);
    if (!jobPost) return res.status(400).send(" No jobpost found by jobpostId.");

    res.send(jobPost);
}


exports.getJobPost = async function (req, res) {
    const { id: jobPostId } = req.params;
    if (!mongoose.isValidObjectId(jobPostId)) return res.status(400).send("Invalid mongo id.");

    const jobPost = await Job.findById(jobPostId);
    if (!jobPost) return res.status(400).send(" No jobpost found by jobpostId.");

    res.send(jobPost);
}