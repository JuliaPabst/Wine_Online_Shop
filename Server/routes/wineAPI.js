const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine");


router.get("/wines", async (req, res) => {
  try {
    const wines = await Wine.find();
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
