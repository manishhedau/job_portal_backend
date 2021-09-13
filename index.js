const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const userProfileRoute = require("./routes/userProfile");
const jobRoute = require("./routes/job");
const applyJobRoute = require("./routes/applyJob");

// console.log(config.get("jwtPrivateKey"));

if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR : jwtPrivateKey is not defined.");
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all the routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/userprofile", userProfileRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/apply-to-job", applyJobRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/jobportal')
    .then(() => {
        console.log("Successfully connected to database..")
    })
    .catch(() => {
        console.log("Failed to connect to database..")
    })


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})