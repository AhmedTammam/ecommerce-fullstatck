const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");

router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);

router.get("/product/:productId", (req, res) => {
  return res.status(200).json({
    product: req.product,
  });
});

router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteProduct
);

router.param("productId", getProductById);

router.param("userId", findUserById);

module.exports = router;
