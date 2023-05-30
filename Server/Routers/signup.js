const express = require("express");
const router = express.Router();
const User = require("../Schemas/signupSchema");

router.post("/", async (req, res) => {
  try {
    const { Name, Email, Age, Password, ConfirmPassword } = req.body;

    const user_exits = await User.findOne({ Email });

    if (user_exits && user_exits.Email == Email) {
      return res.status(400).send("Email is already registed");
    }

    if (Password != ConfirmPassword) {
      return res.status(400).send("Password didn't matched");
    }

    const user = new User({
      Name,
      Email,
      Age,
      Password,
      ConfirmPassword,
    });

    await user.save();

    res.status(200).send("registration completed");
  } catch (error) {
    if (error) throw error;
    console.log(error);
    res.status(500).send("error on the post router", error);
  }
});

module.exports = router;
