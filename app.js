const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const google_analytics = process.env.google_analytics;
const sslRedirect = require("heroku-ssl-redirect");

const MongoClient = require("mongodb").MongoClient;
const url = process.env.mongodb_altas_url;
const randomPatternQuery = async (expressRes) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });
  if (!client) {
    return;
  }
  try {
    const db = client.db("gameOfLife");
    let collection = db.collection("gameOfLifePatterns");
    let randomIndex = Math.floor(Math.random() * 733); // 733 kinds of pattern in total
    let query = { index: randomIndex };
    let res = await collection.findOne(query);
    expressRes.send(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(sslRedirect())
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) =>
    res.render("index", { google_analytics: google_analytics })
  )
  // .get("/", (req, res) => res.sendfile("views/index.html"))
  .get("/random.json", (req, res) => randomPatternQuery(res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
