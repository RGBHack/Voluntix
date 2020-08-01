var express = require("express");
var { renderFile } = require("ejs");
var { Server } = require("http");
var path = require("path");

var app = express();

var serv = new Server(app);

app.engine("html", renderFile);

app.set("views", path.join(__dirname, "/client"));

app.get("/", function (req, res) {
  res.render("index.html", {
    root: __dirname,
  });
});

serv.listen(process.env.PORT || 5000);
