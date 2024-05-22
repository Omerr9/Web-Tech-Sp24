const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
let User = require("../../Models/user");
const auth = require("../../Middleware/auth");

router.post("/sign-up", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.redirect("/sign-up");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.redirect("/sign-up");
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  console.log(req.body);
  if (!user) {
    return res.redirect("/sign-up");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.redirect("/login");
  }
  req.session.user = user;
  return res.redirect("/dashboard");
});

module.exports = router;
