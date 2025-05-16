const express = require("express");
const router = express.Router();
const { register } = require("../controllers/AuthController");
router.get("/", (req, res) => {
  res.send("User api is working");
});
router.post("/register", register);
module.exports = router;
