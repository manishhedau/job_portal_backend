const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        // try catch block because if token is not valid then jwt.verify function throws an excenption
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        // now this user property we can access in every routes
        // so whichever route we modify data first verify user is authorized or not
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid token.")
    }
}

module.exports = auth;

// for logout purpose delete the token from local storage in client 