const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Age: {
    type: Number,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  ConfirmPassword: {
    type: String,
    required: true,
  },
});

User.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 12);
    this.ConfirmPassword = await bcrypt.hash(this.ConfirmPassword, 12);
  }
  next();
});

module.exports = mongoose.model("User", User);
