const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/auth-controller");
const { findUserById } = require("../controllers/user-controller");

router.get("/profile/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", findUserById);

module.exports = router;
