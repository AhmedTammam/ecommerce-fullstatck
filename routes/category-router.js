const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/category-controller");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/auth-controller");
const { findUserById } = require("../controllers/user-controller");

router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
);

router.param("userId", findUserById);

module.exports = router;
