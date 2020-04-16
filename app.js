const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
var sslRedirect = require("heroku-ssl-redirect");

express()
  .use(sslRedirect())
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.sendfile("views/index.html"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
