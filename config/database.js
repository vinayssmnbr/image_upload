const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database Connected"))
    .catch((error) => {
      console.log("Database Connection Issues");
      console.error(error);
    });
};
