const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");

router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
);

router.param("userId", findUserById);

module.exports = router;
