const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

function createServer() {
  const app = express();

  // middlewares
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());

  // routes Middleware
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", categoryRoutes);
  app.use("/api", productRoutes);
  return app;
}

module.exports = createServer;
