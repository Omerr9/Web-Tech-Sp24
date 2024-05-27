const express = require("express");
let router = express.Router();
let messageData = require("../../Models/message");

router.post("/contact-us", async (req, res) => {
    try {
        let data = req.body;
        let record = new messageData(data);
        console.log(data);
        await record.save();
        return res.redirect("/contact-us?message=Message%20Sent%20Successfully");
    } 
    catch (error) {
        return res.status(500).send('Error creating form data: ' + error.message);
    }
});

module.exports = router;