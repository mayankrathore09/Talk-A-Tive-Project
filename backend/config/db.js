const mongoose = require("mongoose");

require("dotenv").config();

const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => console.log("db is connected successfully"))
    .catch((err) => {
      console.log("issue in connecting db");
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectdb;
