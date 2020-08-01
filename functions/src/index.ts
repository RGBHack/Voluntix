import * as functions from 'firebase-functions';
import { Response, Request, Express } from "express";
import express from "express";
import { renderFile } from "ejs";
//import path from "path"


var app: Express = express();


app.engine("html", renderFile);

app.set("views",__dirname+"\\..\\views")

app.get("/", function (req: Request, res: Response) {
  // var model: Model = models[Math.floor(Math.random() * models.length + 1) - 1];
  res.render("index.html", {
    root: __dirname,
    bruh: "custom content"
  });
});

exports.webApp = functions.https.onRequest(app)