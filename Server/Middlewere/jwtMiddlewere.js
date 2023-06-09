const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    const jwttoken = req.header("x-token");

    if (!jwttoken) {
      res.status(400).send("token not found");
      return;
    }

    jwt.verify(jwttoken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(404).send("JWT token has expired.");
        } else {
          return res.status(404).send("Invalid JWT token.");
        }
      }
      //   console.log(user_exists);
      req.user = decoded;
      next();
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).send("Error on the middlewares");
  }
};

module.exports = jwtMiddleware;
