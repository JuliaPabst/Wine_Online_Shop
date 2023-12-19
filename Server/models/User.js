const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  ZIPCode: Number,
  city: String,
  street: String,
  houseNumber: Number,
  flatNumber: Number,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
