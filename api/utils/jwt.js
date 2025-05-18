const jwt = require('jsonwebtoken');

function issueToken(user) {
  return jwt.sign({
    sub: user._id,
    email: user.email,
  }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

module.exports = { issueToken };