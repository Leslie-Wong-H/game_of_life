"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
const randomEvent = require("../../../events/gol-backend-random-event.json");
const tangEvent = require("../../../events/gol-backend-tang-event.json");
var context;

describe("Tests index", function () {
  it("verifies /v1/random.json successful response", async () => {
    const result = await app.lambdaHandler(randomEvent, context);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    let response = JSON.parse(result.body);

    expect(response).to.be.an("object");
    expect(Object.keys(response).indexOf("index")).to.be.greaterThan(-1);
    expect(Object.keys(response).indexOf("uuid")).to.be.greaterThan(-1);
    expect(Object.keys(response).indexOf("pattern")).to.be.greaterThan(-1);
    expect(response.pattern).to.be.an("array");
    expect(Object.keys(response).indexOf("height")).to.be.greaterThan(-1);
    expect(Object.keys(response).indexOf("width")).to.be.greaterThan(-1);
  });

  it("verifies /v1/tang.json successful response", async () => {
    const result = await app.lambdaHandler(tangEvent, context);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    let response = JSON.parse(result.body);

    expect(response).to.be.an("object");
    expect(Object.keys(response).indexOf("index")).to.be.greaterThan(-1);
    expect(Object.keys(response).indexOf("English")).to.be.greaterThan(-1);
    expect(response.English).to.be.an("object");
    expect(Object.keys(response).indexOf("Chinese")).to.be.greaterThan(-1);
    expect(response.Chinese).to.be.an("object");
    expect(Object.keys(response).indexOf("tags")).to.be.greaterThan(-1);
    expect(response.tags).to.be.an("array");
  });
});
