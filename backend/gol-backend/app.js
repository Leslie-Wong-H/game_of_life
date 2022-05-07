/*
 * @Leslie-Wong-H
 * @2020-07-01
 * @description: AWS SAM API implementation for https://api.playgameoflife.live/v1/tang.json and https://api.playgameoflife.live/v1/random.json
 */

const get = require("lodash/get");
const MongoClient = require("mongodb").MongoClient;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    // API implementation for https://api.playgameoflife.live/v1/tang.json
    if (get(event, "path") === "/v1/tang.json") {
      const url = process.env.MONGODB_ATLAS_URL;
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
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          body: JSON.stringify(res),
        };
      } catch (err) {
        console.log(err);
      } finally {
        client.close();
      }
    }

    // API implementation for https://api.playgameoflife.live/v1/tang.json
    if (get(event, "path") === "/v1/random.json") {
      const url = process.env.MONGODB_ATLAS_URL;
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
        const resPolisher = (res) => {
          return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify(res),
          };
        };
        const expressQuery = get(event, "queryStringParameters");
        if (expressQuery && expressQuery.heightmax && expressQuery.widthmax) {
          const heightmax = Number(expressQuery.heightmax);
          const widthmax = Number(expressQuery.widthmax);
          while (res.height > heightmax || res.width > widthmax) {
            randomIndex = Math.floor(Math.random() * 733);
            query = { index: randomIndex };
            res = await collection.findOne(query);
          }
          return resPolisher(res);
        } else {
          return resPolisher(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        client.close();
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello GOL!",
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
