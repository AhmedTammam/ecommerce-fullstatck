const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/product-controller");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/auth-controller");
const { findUserById } = require("../controllers/user-controller");

router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);

router.param("userId", findUserById);

module.exports = router;
