const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");
const alreadyLoggedIn = require("../../Middleware/alreadyloggedin");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/sign-up", alreadyLoggedIn, (req, res) => {
  const { message } = req.query;
  res.render("sign-up", { message });
});

router.get("/login", alreadyLoggedIn, (req, res) => {
  const { message } = req.query;
  res.render("login", { message });
});

router.get("/contact-us", (req, res) => {
  const { message } = req.query;
  res.render("contact-us", { message });
});

router.get("/services", (req, res) => {
  res.render("services");
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });
});

module.exports = router;
