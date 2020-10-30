const express = require("express");
const router = express.Router();

const {
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");

router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", (req, res) => {
  return res.json(req.category);
});

router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteCategory
);

router.get("/categories", getAllCategories);

router.param("categoryId", findCategoryById);
router.param("userId", findUserById);

module.exports = router;
