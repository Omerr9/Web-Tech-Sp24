const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../Models/user");

const secret = "TOP JWT SECRET"; // Define the secret directly in the code

// Sign-Up Route
router.post("/sign-up", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.redirect("/sign-up?message=Username%20Already%20Taken.");
  }  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login?message=Signed%20Up%20Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong at server.");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.redirect("sign-up?message=Username%20Doesnt%20Exist.%20Create%20An%20Account");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.redirect("/login?message=Incorrect%20Password");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      secret,
      { expiresIn: "900s" }
    );
    res.cookie('token', token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Something went wrong at server.");
  }
});

router.post("/logout", (req, res) => {
  res.cookie('token', '', { expiresIn: new Date(0), httpOnly: true });
  res.redirect("/login?message=Logged%20Out%20Successfully");
});

module.exports = router;
