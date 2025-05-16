const bcrypt = require('bcrypt');
const User = require('../models/User')
async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    authProvider: 'local',
  });

  res.status(201).json({ message: 'User registered' });
}

module.exports = { register }