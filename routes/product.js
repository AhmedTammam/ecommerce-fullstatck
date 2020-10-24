const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");

router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);

router.param("userId", findUserById);

module.exports = router;
