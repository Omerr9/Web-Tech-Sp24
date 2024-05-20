const express = require("express");
let router = express.Router();
let User = require("../Models/User");

router.post('/sign-up', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });

    if (user) {
        return res.redirect('sign-up');
    }
    
    user = await User(req.body);
    await user.save();
    res.render('/login');
})

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect("/login");
})

router.post('/login', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.redirect("/sign-up");
    }
    if (user.password != req.body.password) {
        return res.redirect("/login");
    }
    req.session.user = user;
    return res.redirect('/workouts');
})

module.exports = router;
