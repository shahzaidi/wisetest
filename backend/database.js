const mongoose = require("mongoose");

const dataBaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/WebETest", {
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(
        `Data Base Connected Successfully on ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = dataBaseConnection;
