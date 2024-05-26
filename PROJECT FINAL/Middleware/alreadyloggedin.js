const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const secret = "TOP JWT SECRET";

async function alreadyLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (token) {
        return res.redirect("/dashboard");
    }
    next();
}

module.exports = alreadyLoggedIn;