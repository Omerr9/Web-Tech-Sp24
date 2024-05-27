const express = require("express");
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    username: String,
    workoutName: String,
    exercises: String,
    duration: String,
    date: String
});

const workoutData = mongoose.model('Workouts', workoutSchema);
module.exports = workoutData;
