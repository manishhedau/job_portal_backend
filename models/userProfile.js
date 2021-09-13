const mongoose = require("mongoose");
const Joi = require("joi");
const joiObjectid = require("joi-objectid");

Joi.objectId = joiObjectid(Joi);


const userProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true,
    },
    educations: [
        {
            course: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            instituation: {
                type: String,
                required: true,
                maxlength: 255
            }

        }
    ],
    projects: [
        {
            project_name: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            project_desc: {
                type: String,
                required: true
            },
            project_link: {
                type: String,
                required: true,
                maxlength: 255
            }
        }
    ],
    description: {
        type: String,
    }
})

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

function validateUserProfile(userProfile) {
    const userProfileValidation = Joi.object({
        userId: Joi.objectId().required(),
        skills: Joi.array().required(),
        educations: Joi.array().items({
            course: Joi.string().min(5).max(255).required(),
            instituation: Joi.string().max(255).required(255)
        }).required(),
        projects: Joi.array().items({
            project_name: Joi.string().min(5).max(255).required(),
            project_desc: Joi.string().required(),
            project_link: Joi.string().max(255).required()
        }).required(),
        description: Joi.string().required()
    })
    return userProfileValidation.validate(userProfile);
}


module.exports.validate = validateUserProfile;
module.exports.UserProfile = UserProfile;
