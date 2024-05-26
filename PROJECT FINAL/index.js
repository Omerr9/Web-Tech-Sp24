const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const server = express();
require("dotenv").config();

// MIDDLEWARES
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const auth = require("./Middleware/auth");
const alreadyLoggedIn = require("./Middleware/alreadyloggedin");

// VIEW ENGINE
server.set("view engine", "ejs");
server.use(express.static("public"));

// ROUTES SETUP
server.use(require("./Routes/Api/messages"));
server.use(require("./Routes/Api/users"));
server.use(require("./Routes/Api/workouts"));

server.get("/", (req, res) => {
  res.render("homepage");
});

server.get("/sign-up", alreadyLoggedIn, (req, res) => {
  const { message } = req.query;
  res.render("sign-up", { message });
});

server.get("/login", alreadyLoggedIn, (req, res) => {
  const { message } = req.query;
  res.render("login", { message });
});

server.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

server.get("/services", (req, res) => {
  res.render("services");
});

server.get("/about-us", (req, res) => {
  res.render("about-us");
});

server.get("/dashboard", auth, (req, res) => {
  res.render("dashboard",{username:req.user.username,firstName:req.user.firstName,lastName: req.user.lastName});
});

// DATABASE
mongoose.connect("mongodb://localhost:27017/Project").then((data) => {
  console.log("DB Connected");
});

// RUN SERVER
let port = 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
