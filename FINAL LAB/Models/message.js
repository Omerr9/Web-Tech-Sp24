const express = require("express");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    fullName: String,
    gender: {
        type: String,
        enum: ["male","female"]
    },
    dateOfBirth: Date,
    email: String,
    phone: String,
    subject: String,
    message: String
})

const MessageData = mongoose.model('MessageData', messageSchema);
module.exports = MessageData;