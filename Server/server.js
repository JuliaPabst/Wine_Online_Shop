require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
let Wine = require("./models/Wine.js");

const mongoDBUri = process.env.mongoDBUri;

mongoose
  .connect(mongoDBUri)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Connection error", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

Wine.create({
  name: "Rosato",
  taste: "Fruchtig, weich und seidig",
  description:
    "Die Farbe verrät schon die Wurzeln dieses herrlichen Rosèweines. Fruchtig, weich und seidig. Der ideale Wein für einen warmen Sommer.",
  alcoholLevel: 12,
  servingTemperature: "8-10°C",
  price: 14,
  pictureURL:
    "https://www.suffumbergi.com/wp-content/uploads/2020/05/rosato.png",
  createdAt: Date.now(),
  updatedAt: Date.now(),
})
  .then((wine) => {
    console.log(wine); //this part only runs when the data has entered the database
  })
  .catch((error) => {
    console.error(error); //this line sends the error into the console if something went wrong
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
