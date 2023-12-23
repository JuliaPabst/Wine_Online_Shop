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

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    console.log("User found:", user);
    res.json({ status: "loggedIn", user_id: user._id });
  } else {
    res.status(401).json({ status: "error", message: "Invalid credentials" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ZIPCode: req.body.ZIPCode,
      city: req.body.city,
      houseNumber: req.body.houseNumber,
      flatNumber: req.body.flatNumber,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
