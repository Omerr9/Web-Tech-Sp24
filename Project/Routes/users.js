let express = require("express");
let router = express.Router();
let User = require("../Models/User");
const users = require("../Models/User");

router.post("/users", async (req, res) => {
    let data = req.body;
    let record = new User(data);
    await record.save();
    return res.send(record);
})

module.exports = router;