const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "This Email isn't exist",
      });
    }

    if (!user.authenticated) {
      return res.status(401).json({
        error: "Email and password not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    res.cookie("access_token", token, { exipre: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Sigout success" });
};

//  will use with private routes
exports.requireSignin = expressJwt({
  secret: process.env.JWT_TOKEN,
  algorithms: ["HS256"],
  userProperty: "auth",
});
