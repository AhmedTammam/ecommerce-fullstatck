const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createCategory = (req, res, next) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.this.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};
