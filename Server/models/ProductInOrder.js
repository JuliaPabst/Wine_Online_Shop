const mongoose = require("mongoose");

const productInOrderSchema = new mongoose.Schema({
  Wine_ID: Number,
  Order_ID: Number,
  createdAt: Date,
  updatedAt: Date,
});

const ProductInOrder = mongoose.model("ProductInOrder", productInOrderSchema);

module.exports = ProductInOrder;
