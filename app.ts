import { Response, Request, Express } from "express";
import express from "express";
import { renderFile } from "ejs";
import { Server } from "http";
import path from "path"

console.log("Running on port 5000");


var app: Express = express();

var serv: Server = new Server(app);

app.engine("html", renderFile);

app.set("views", path.join(__dirname, "/client"));

app.get("/", function (req: Request, res: Response) {
  // var model: Model = models[Math.floor(Math.random() * models.length + 1) - 1];
  res.render("index.html", {
    root: __dirname,
    bruh: "custom content"
  });
});

serv.listen(process.env.PORT || 5000);