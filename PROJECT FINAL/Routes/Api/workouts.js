const express = require("express");
const router = express.Router();
const Workout = require("../../Models/workout");
const auth = require("../../Middleware/auth");

router.post("/workouts",auth, async (req, res) => {
    try {
        const username = req.user.username;
        console.log(username);
        const { workoutName, exercises, duration } = req.body;
        const newWorkout = new Workout({ username, workoutName, exercises, duration });
        await newWorkout.save();
        console.log(newWorkout);
        return res.redirect("/dashboard");
    } catch (error) {
        return res.status(500).json({ message: 'Error creating workout: ' + error.message });
    }
});

router.get("/workouts", auth, async (req, res) => {
    const username = req.user.username;
    const workouts = await Workout.find({ username });
    return res.json(workouts)
});

router.delete('/workouts/:id', async (req, res) => {
        const workoutId = req.params.id;
        res.redirect("/dashboard"); // Send a 204 No Content response on success
});



module.exports = router;
