let express = require('express');
const mongoose = require("mongoose");
let server = express();

server.set("view engine", "ejs");
server.use(express.static("public"));

server.get("/", (req, res) => {
    res.render("homepage");
})

server.get("/contact-us", (req, res) => {
    res.render("contact-us");
})

server.get("/services", (req, res) => {
    res.render("services");
})

mongoose.connect("mongodb://localhost:27017/Projects").then((data) => {
  console.log("DB Connected");
});

let port = 3000;

server.listen(port, () => {
    console.log("Server listening on port " + port);
});