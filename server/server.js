var express = require("express");
var cors = require("cors");
var app = express();
var phones = require("./phones.json");

app.use(cors());

app.get("/phones", function (req, res) {
  res.send(phones);
});

app.listen(3000);
