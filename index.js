const express = require("express");
const app = express();
const morgan = require("morgan")("tiny");
const roomcontroller = require("./controllers/roomcontroler");
var cors = require("cors");
app.use(morgan);
app.use(express.json());
app.use(cors());
app.use("", roomcontroller);
app.listen(8080, () => {
  console.log("Started on 8080");
});
