const express = require("express");
const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone_no: String,
    username: {
        type: String,
        required: true
    },
    password: String
});

let user = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = user;