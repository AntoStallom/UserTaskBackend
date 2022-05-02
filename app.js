const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const config = require("./config");
// console.log(config);

let admin = require("./router/admin");

// security
app.use(helmet());

// cors
app.use(cors());

// convert everything to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://7358180058:${config.MONGODB_CONNECTON_PWD}@cluster0.ziad7.mongodb.net/test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.use("/api/admin", admin);

module.exports = app;
