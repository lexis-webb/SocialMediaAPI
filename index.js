const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");


dotenv.config();

mongoose.connect(process.env.MONGO_URL);

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Homepage")
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });