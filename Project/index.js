let express = require('express');
let bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const isAuthenticated = require("./Middleware/isAuthenticated");
let server = express();
const Users = require("./Models/User");


server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded());
server.use(cookieParser);
server.use(session({ secret: "Secret" }));
server.use(require("./Middleware/middlewares"));


server.get("/", (req, res) => {
    res.render("homepage");
})

server.get("/sign-up", (req, res) => {
    res.render("sign-up");
})

server.get("/login", (req, res) => {
    res.render("login");
});
server.get("/contact-us", (req, res) => {
    res.render("contact-us");
}); 
server.get("/services", (req, res) => {
    res.render("services");
});
// server.get("/workout", isAuthenticated, (req, res) => {
//     res.render("workout");
// })

mongoose.connect("mongodb://localhost:27017/Project").then((data) => {
    console.log("DB Connected");
});

let port = 3000;

server.listen(port, () => {
    console.log("Server listening on port " + port);
});