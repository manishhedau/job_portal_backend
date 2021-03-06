const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

exports.registration = async function (req, res) {
    const error = validate(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user is already exists.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
}