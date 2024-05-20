const mongoose = require("mongoose");

const LogInSchema = mongoose.Schema({
    name: String,
    phone_no: Number,
    username: String,
    password: String,
})

let users = mongoose.model("Users", LogInSchema)
module.exports = users;

