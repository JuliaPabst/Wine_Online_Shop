const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_ID: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
