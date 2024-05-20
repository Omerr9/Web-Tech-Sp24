const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const server = express();

server.use(cookieParser());
server.use(session({ secret: "PROTECTED!" }));


server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

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

server.get("about-us", (req, res) => {
  res.render("/about-us");
})

mongoose.connect("mongodb://localhost:27017/Project").then((data) => {
  console.log("DB Connected");
});

let port = 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
