const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

const authRoutes = require("./routes/auth");

function createServer() {
  const app = express();

  // middlewares
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());
  // routes Middleware
  app.use("/api", authRoutes);
  return app;
}

module.exports = createServer;
