const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },

  lastname: {
    type: String,
    required: [true, "Last Name is Required"],
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
  },

  phone: {
    type: String,
    required: [true, "Mobile Number is Required"],
  },

  project: {
    type: String,
    required: [true, "Project Name is Required"],
  },
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
