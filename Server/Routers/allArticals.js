const express = require("express");
const router = express.Router();
const articalsSchema = require("../Schemas/articalsSchema");
const jwtMiddleware = require("../Middlewere/jwtMiddlewere");

router.get("/", jwtMiddleware, async (req, res) => {
  try {
    const articals = await articalsSchema.find().populate("author");

    res.status(200).json(articals);
  } catch (error) {
    if (error) throw error;
    res.status(400).send("error on the allarticlas router", error);
  }
});

module.exports = router;
