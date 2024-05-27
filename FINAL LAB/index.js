const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const server = express();
require("dotenv").config();

// MIDDLEWARES
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const session = require("express-session");
server.use(
  session({
    secret: "yourSecretKey", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000*60*60
     }, // Set to true if using HTTPS
  })
);

// VIEW ENGINE
server.set("view engine", "ejs");
server.use(express.static("public"));

// ROUTES SETUP
server.use(require("./Routes/Api/messages"));
server.use(require("./Routes/Api/users"));
server.use(require("./Routes/Api/workouts"));
server.use(require("./Routes/Site/site"));

// DATABASE
mongoose.connect("mongodb://localhost:27017/Project").then((data) => {
  console.log("DB Connected");
});

// RUN SERVER
let port = 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
