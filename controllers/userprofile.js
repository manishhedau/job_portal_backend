const { UserProfile, validate } = require("../models/userProfile");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");

// userprofile id
exports.getUserProfile = async function (req, res) {
    const userProfile = await UserProfile.findOne({ userId: req.user._id });
    if (!userProfile) return res.status(400).send("Invalid userprofileID.");

    res.send(userProfile);
}

exports.setUserProfile = async function (req, res) {
    const error = validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid userId");

    const userprofile = await new UserProfile(_.pick(req.body, ["userId", "skills", "educations", "projects", "description"]))
    await userprofile.save();

    console.log(userprofile);

    res.send("Successfully set the value..");
}


exports.updateUserProfile = async function (req, res) {
    const error = validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    let userProfile = await UserProfile.findOne({ userId: req.user._id });
    if (!userProfile) return res.status(400).send("Invalid userprofileId");

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid userId");

    userProfile = await UserProfile.findByIdAndUpdate(userProfile._id, _.pick(req.body, ["userId", "skills", "educations", "projects", "description"]), { new: true })

    res.send(userProfile);
}
