const express = require("express");
const router = express.Router();
const Workout = require("../../Models/workout");
const auth = require("../../Middleware/auth");
const storeSearchInSession = require("../../Middleware/storeSearchInSession");

router.post("/workouts", auth, async (req, res) => {
  try {
    const username = req.user.username;
    console.log(username);
    const { workoutName, exercises, duration, date } = req.body;
    const newWorkout = new Workout({
      username,
      workoutName,
      exercises,
      duration,
      date,
    });
    await newWorkout.save();
    console.log(newWorkout);
    return res.redirect("/dashboard");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating workout: " + error.message });
  }
});

router.get("/workouts/:page?", auth, storeSearchInSession, async (req, res) => {
  let page = Number(req.params.page) || 1;
  let pageSize = 3;
  const username = req.user.username;
  const searchQuery = req.query.query || "";

  let query = { username };
  if (searchQuery) {
    query.workoutName = { $regex: searchQuery, $options: "i" };
  }

  let workouts = await Workout.find(query)
    .sort({ date: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  let total = await Workout.countDocuments(query);
  let totalPages = Math.ceil(total / pageSize);

  res.json({
    pageTitle: "List All Workouts",
    workouts,
    total,
    page,
    pageSize,
    totalPages,
  });
});

router.get("/workout/delete/:id", async (req, res) => {
  const workoutId = req.params.id;
  const workout = await Workout.findByIdAndDelete(workoutId);
  console.log(workout);
  res.redirect("/dashboard");
});

router.get('/searches', auth, (req, res) => {
  const searches = req.session.searches || [];
  console.log(searches);
  res.json({ searches });
});


router.put("/workout/update/:id", auth, async (req, res) => {
  try {
    const workoutId = req.params.id;
    const { workoutName, exercises, duration, date } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      {
        workoutName,
        exercises,
        duration,
        date,
      },
      { new: true } // Return the updated document
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    console.log(updatedWorkout);
    return res.redirect("/dashboard");
  } catch (error) {
    return res.redirect("/dashboard");
  }
});

module.exports = router;
