const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const secret = "TOP JWT SECRET";

const apiauth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login", { value: "hello" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.redirect("/sign-up");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.redirect("/login");
  }
};

module.exports = apiauth;
x