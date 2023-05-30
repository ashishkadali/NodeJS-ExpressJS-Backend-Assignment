const express = require("express");

const router = express.Router();
const User = require("../Schemas/signupSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user_exits = await User.findOne({ Email });

    if (!user_exits) {
      return res.status(400).send("User is not registered");
    }

    const PasswordMatch = bcrypt.compare(Password, user_exits.Password);

    if (!PasswordMatch) {
      return res.status(400).send("Password didnt matched");
    }

    const token = jwt.sign(
      { _id: user_exits._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    if (error) throw error;
    res.status(500).send("error on the login router", error);
  }
});

module.exports = router;
