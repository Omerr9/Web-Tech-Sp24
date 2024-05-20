const express = require("express");
const router = express.Router();
let User = require("../../Models/user");

router.post("/sign-up", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.redirect("/sign-up");
        }
        user = new User(req.body);
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
    if(user.password != req.body.password) {
        return res.redirect("/login");
    }
    req.session.user = user;
    return res.redirect("/");
})

module.exports = router;