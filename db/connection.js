const mongoose = require("mongoose");

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
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
    } else {
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
    }
  });
};

module.exports = { connect };
