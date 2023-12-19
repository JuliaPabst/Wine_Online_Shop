const mongoose = require("mongoose");

const productInOrderSchema = new mongoose.Schema({
  Wine_ID: String,
  Order_ID: String,
  createdAt: Date,
  updatedAt: Date,
});

const ProductInOrder = mongoose.model("ProductInOrder", productInOrderSchema);

module.exports = ProductInOrder;
