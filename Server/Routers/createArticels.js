const express = require("express");
const router = express.Router({ mergeParams: true });
const Articles = require("../Schemas/articalsSchema");
const jwtMiddleware = require("../Middlewere/jwtMiddlewere");

router.post("/", jwtMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { Title, Description } = req.body;

    const articlesData = new Articles({
      Title,
      Description,
      author: userId,
    });

    await articlesData.save();

    res.status(200).json(articlesData);
  } catch (error) {
    if (error) throw error;
    res.status(400).send("error inside the Articels router", error);
  }
});

module.exports = router;
