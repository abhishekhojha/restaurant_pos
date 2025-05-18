const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  googleId: String,
  avatar: String,
});
// hash password pre save
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }
  next();
});
userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
