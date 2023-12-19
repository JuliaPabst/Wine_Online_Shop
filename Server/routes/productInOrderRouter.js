const express = require("express");
const router = express.Router();
const ProductInOrder = require("../models/ProductInOrder");

router.get("/", async (req, res) => {
  try {
    const productsInOrders = await ProductInOrder.find();
    res.json(productsInOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
