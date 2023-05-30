const express = require("express");
const jwtMiddleware = require("../Middlewere/jwtMiddlewere");
const router = express.Router({ mergeParams: true });

const User = require("../Schemas/signupSchema");

router.put("/", jwtMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { Name, Age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          Name,
          Age,
        },
      },
      { new: true }
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    if (error) throw error;
    res.status(404).send("error on the update profile router");
  }
});

module.exports = router;
