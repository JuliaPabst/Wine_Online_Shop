const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  name: String,
  taste: String,
  description: String,
  alcoholLevel: Number,
  servingTemperature: String,
  price: Number,
  pictureURL: String,
  createdAt: Date,
  updatedAt: Date,
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;
