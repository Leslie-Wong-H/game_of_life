const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config("./env");

const PORT = process.env.PORT || 5000;
const google_analytics = process.env.google_analytics;
const sslRedirect = require("heroku-ssl-redirect");

const MongoClient = require("mongodb").MongoClient;
const url = process.env.mongodb_altas_url;

const chinesePoetryQuery = async (expressRes, expressQuery) => {
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
    const db = client.db("chinesePoetry");
    let collection = db.collection("tang");
    let dbStats = await collection.stats();
    // let randomNumber = Math.floor(Math.random() * 97); // 97 poems in total
    let randomNumber = Math.floor(Math.random() * dbStats.count);
    let randomIndex = `1-00${
      randomNumber < 10 ? "0" + String(randomNumber) : String(randomNumber)
    }`;
    let query = { index: randomIndex };
    let res = await collection.findOne(query);
    expressRes.send(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const randomPatternQuery = async (expressRes, expressQuery) => {
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
    let dbStats = await collection.stats();
    // let randomIndex = Math.floor(Math.random() * 733); // 733 kinds of pattern in total
    let randomIndex = Math.floor(Math.random() * dbStats.count);
    let query = { index: randomIndex };
    let res = await collection.findOne(query);
    if (expressQuery && expressQuery.heightmax && expressQuery.widthmax) {
      const heightmax = Number(expressQuery.heightmax);
      const widthmax = Number(expressQuery.widthmax);
      while (res.height > heightmax || res.width > widthmax) {
        randomIndex = Math.floor(Math.random() * 733);
        query = { index: randomIndex };
        res = await collection.findOne(query);
      }
      expressRes.send(res);
    } else {
      expressRes.send(res);
    }
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
  // uncomment sslRedirect if build a container image and push to docker hub.
  .use(sslRedirect())
  .use(logger("short"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "dist")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  // .get("/", (req, res) =>
  //   res.render("index", { google_analytics: google_analytics })
  // )
  // .get("/", (req, res) => res.sendfile("dist/index.html"))
  .get("/random.json", (req, res) => randomPatternQuery(res, req.query))
  .get("/tang.json", (req, res) => chinesePoetryQuery(res, req.query))
  .get("*", (req, res) => {
    res.redirect("/");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
