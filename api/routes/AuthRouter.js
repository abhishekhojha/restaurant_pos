const express = require("express");
const router = express.Router();
const passport = require('passport');
const { issueToken } = require("../utils/jwt");
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"; 
const { register } = require("../controllers/AuthController");
router.get("/", (req, res) => {
  res.send("User api is working");
});
router.post("/register", register);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = issueToken(req.user);
    res.redirect(`${CLIENT_URL}/oauth-success?token=${token}`);
  }
);
module.exports = router;
