const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: [
    {
      wine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
