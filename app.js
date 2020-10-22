const mongoose = require("mongoose");
const createServer = require("./server"); // new

const db = require("./db/connection");

db.connect().then(() => {
  const app = createServer(); // new
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
