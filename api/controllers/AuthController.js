const User = require("../models/User");
const { issueToken } = require("../utills/jwt");
async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const newUser = await User.create({
    name,
    email,
    password: password,
    authProvider: "local",
  });

  res.status(201).json({ message: "User registered" });
}
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.authProvider !== "local") {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValid = user.validPassword(password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = issueToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
module.exports = { register, login };
