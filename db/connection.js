const mongoose = require("mongoose");

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        console.log("DB connected");
        resolve();
      });
  });
};

module.exports = { connect };
