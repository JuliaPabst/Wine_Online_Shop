const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/signIn", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ status: "loggedIn" });
  } else {
    res.status(401).json({ status: "error", message: "Invalid credentials" });
  }
});

module.exports = router;
