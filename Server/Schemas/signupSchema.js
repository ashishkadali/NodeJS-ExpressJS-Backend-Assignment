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

User.pre("save", function (next) {
  if (this.isModified("Password")) {
    this.Password = bcrypt.hashSync(this.Password, 10);
    this.ConfirmPassword = bcrypt.hashSync(this.ConfirmPassword, 10);
  }
  next();
});

module.exports = mongoose.model("User", User);
