const mongoose = require("mongoose");
const Joi = require("joi");
const joiObjectid = require("joi-objectid");

Joi.objectId = joiObjectid(Joi);

const jobSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    job_title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    qualification: {
        type: Array,
        required: true
    },
    yearOfExperience: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    job_desc: {
        type: String,
        required: true,
        minlength: 50,
    },
    company_link: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    company_description: {
        type: String,
        required: true,
        minlength: 50
    }
})

const Job = mongoose.model("Job", jobSchema);

function validateJob(job) {
    const jobValidationSchema = Joi.object({
        userId: Joi.objectId().required(),
        company_name: Joi.string().min(5).max(50).required(),
        job_title: Joi.string().min(5).max(255).required(),
        qualification: Joi.array().required(),
        yearOfExperience: Joi.number().min(0).required(),
        job_desc: Joi.string().min(5).required(),
        company_link: Joi.string().min(5).max(50),
        company_description: Joi.string().min(5).required()
    })
    return jobValidationSchema.validate(job);
}

module.exports.validate = validateJob;
module.exports.Job = Job;