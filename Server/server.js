require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const mongoDBUri = process.env.mongoDBUri;
mongoose
  .connect(mongoDBUri)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Connection error", err));

const wineRouter = require("./routes/wineRouter");
const orderRouter = require("./routes/orderRouter");
const productInOrderRouter = require("./routes/productInOrderRouter");
const userRouter = require("./routes/userRouter");

app.use("/api/wines", wineRouter);
app.use("/api/orders", orderRouter);
app.use("/api/productsInOrders", productInOrderRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
