const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const router = require("express").Router();
let Exercise = require("./models/exercise.model");
let User = require("./models/user.model");
app.use("/", router);
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
router.route("/users").get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/exercises").get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/users/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const newUser = new User({ username });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/exercises/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });
    const savedExercise = await newExercise.save();
    res.json(savedExercise);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/exercises/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/exercises/:id").delete(async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.json("Exercise deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.route("/exercises/update/:id").post(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    if (req.body.username) exercise.username = req.body.username;
    if (req.body.description) exercise.description = req.body.description;
    if (req.body.duration) exercise.duration = Number(req.body.duration);
    if (req.body.date) exercise.date = Date.parse(req.body.date);

    await exercise.save();
    res.json("Exercise updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
