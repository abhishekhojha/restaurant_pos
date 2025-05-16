const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_URL = process.env.MONGO_URI;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });