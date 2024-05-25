const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const server = express();
require('dotenv').config();

// MIDDLEWARES
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const auth = require("./Middleware/auth"); 

// VIEW ENGINE
server.set("view engine", "ejs");
server.use(express.static("public"));

// ROUTES SETUP
server.use(require("./Routes/Api/messages"));
server.use(require("./Routes/Api/users"));

server.get("/", (req, res) => {
  res.render("homepage");
});

server.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

server.get("/login", (req, res) => {
    res.render("login");
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

server.get("/dashboard",auth,(req, res) => {
  res.send(`Welcome ${req.user.firstName} ${req.user.lastName}`);
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

