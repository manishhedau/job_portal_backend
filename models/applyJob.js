const mongoose = require("mongoose");
const Joi = require("joi");
const joiObjectid = require("joi-objectid");

Joi.objectId = joiObjectid(Joi);

const applyJobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },

    applyJob: [
        {
            userId: {
                type: String,
                required: true
            }
        }
    ]
});


const ApplyJob = mongoose.model("ApplyJob", applyJobSchema);

function validateApplyJob(applyJob) {
    const applyJobValidationSchema = Joi.object({
        jobId: Joi.objectId().required(),
        applyJob: Joi.array().items({
            userId: Joi.objectId().required()
        })
    })


    return applyJobValidationSchema.validate(applyJob);
}

function applyToJobValidate(res) {
    const applyToJobValidationSchema = Joi.object({
        jobId: Joi.objectId().required(),
        userId: Joi.objectId().required(),
    })

    return applyToJobValidationSchema.validate(res);
}

module.exports.validate = validateApplyJob;
module.exports.applyToJobValidate = applyToJobValidate;
module.exports.ApplyJob = ApplyJob;