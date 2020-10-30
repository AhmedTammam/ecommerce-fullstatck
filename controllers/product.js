const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // all fields validation
    const { name, description, category, price, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All Fields required",
      });
    }

    let data;
    const allowedSize = 1000000; //1MB
    if (files.photo) {
      // check for photo size
      if (files.photo.size > allowedSize) {
        res.status(400).json({
          error: "Image should be less than 1 MB",
        });
      }

      const oldPath = files.photo.path;
      const newPath = path.join(
        __dirname,
        `../uploads/images/${files.photo.name}`
      );
      var rawData = fs.readFileSync(oldPath);

      fs.writeFile(newPath, rawData, function (err) {
        if (err) console.log(err);
      });
      data = { ...fields, photo: `../uploads/images/${files.photo.name}` };
    }
    let product = new Product(data);

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // all fields validation
    const { name, description, category, price, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All Fields required",
      });
    }

    let data;
    const allowedSize = 1000000; //1MB
    if (files.photo) {
      // check for photo size
      if (files.photo.size > allowedSize) {
        res.status(400).json({
          error: "Image should be less than 1 MB",
        });
      }

      const oldPath = files.photo.path;
      const newPath = path.join(
        __dirname,
        `../uploads/images/${files.photo.name}`
      );
      var rawData = fs.readFileSync(oldPath);

      fs.writeFile(newPath, rawData, function (err) {
        if (err) console.log(err);
      });
      data = { ...fields, photo: `../uploads/images/${files.photo.name}` };
    }
    let product = req.product;
    product = _.extend(product, data);

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "product deleted successfully",
    });
  });
};
