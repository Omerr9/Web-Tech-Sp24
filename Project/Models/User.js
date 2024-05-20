const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

let user = mongoose.model.User || mongoose.model("user", userSchema);
module.exports = user;

