const express = require("express");
const app = express();
const morgan = require("morgan")("tiny");
const roomcontroller = require("./controllers/roomcontroler");
app.use(morgan);
app.use(express.json());
app.use("", roomcontroller);
app.listen(8080, () => {
  console.log("Started on 8080");
});
