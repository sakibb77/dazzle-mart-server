require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//variables
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// express app
const app = express();

//middlewares
app.use(express.json());
app.use(cors({ credentials: true }));

//test api
app.get("/", (req, res) => {
  res.status(200).json("welcome to dezzle mart server");
});

//database
mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
