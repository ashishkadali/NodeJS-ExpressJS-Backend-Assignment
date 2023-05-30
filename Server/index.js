const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const signupRouter = require("./Routers/signup");
const loginRouter = require("./Routers/login");
const createArticelsRouter = require("./Routers/createArticels");
const allArticelsRouter = require("./Routers/allArticals");
const updateRouter = require("./Routers/updateProfile");

dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/Backend-assignemnt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error in connecting to the database:", error);
  });

app.get("/", (req, res) => {
  res.status(200).send("Hellow welcome to Expresjs backend");
});

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/users/:userId/articles", createArticelsRouter);
app.use("/api/articles", allArticelsRouter);
app.use("/api/users/:userId", updateRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server is running at port", PORT);
});
