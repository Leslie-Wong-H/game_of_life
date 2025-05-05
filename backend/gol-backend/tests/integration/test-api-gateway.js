"use strict";

const chai = require("chai");
const {
  CloudFormationClient,
  DescribeStacksCommand,
} = require("@aws-sdk/client-cloudformation");
const https = require("https");
const expect = chai.expect;

/**
 * Get stack name from environment variable AWS_SAM_STACK_NAME.
 * throw exception if AWS_SAM_STACK_NAME is not set.
 */
const getStackName = () => {
  const stackName = process.env["AWS_SAM_STACK_NAME"];
  if (!stackName) {
    throw new Error(
      "Cannot find env var AWS_SAM_STACK_NAME.\n" +
        "Please setup this environment variable with the stack name where we are running integration tests."
    );
  }

  return stackName;
};

/**
 * Make sure env variable AWS_SAM_STACK_NAME exists with the name of the stack we are going to test.
 */
describe("Test API Gateway", function () {
  let apiEndpoint;

  /**
   * Based on the provided stack name,
   * here we use cloudformation API to find out what the GOLBackendApi URL is
   */
  before(async () => {
    const stackName = getStackName();

    const client = new CloudFormationClient({
      region: process.env["AWS_REGION"],
      accessKeyId: process.env["AWS_ACCESS_KEY"],
      secretAccessKey: process.env["AWS_SECRET_KEY"],
    });

    let response;
    try {
      const command = new DescribeStacksCommand({
        StackName: stackName,
      });
      response = await client.send(command);
    } catch (e) {
      throw new Error(
        `Cannot find stack ${stackName}: ${e.message}\n` +
          `Please make sure stack with the name "${stackName}" exists.`
      );
    }

    const stacks = response.Stacks;

    const stackOutputs = stacks[0].Outputs;
    const apiOutput = stackOutputs.find(
      (output) => output.OutputKey === "GOLBackendApi"
    );

    expect(apiOutput, `Cannot find output GOLBackendApi in stack ${stackName}`)
      .not.to.be.undefined;

    apiEndpoint = apiOutput.OutputValue;
  });

  /**
   * Call the API Gateway endpoint and check the response
   */
  it("verifies /v1/random.json successful response from api gateway", (done) => {
    const randomApiEndpoint = apiEndpoint.replace(/v1\/$/, "v1/random.json");
    console.info("random api endpoint:", randomApiEndpoint);
    https
      .get(randomApiEndpoint, (res) => {
        expect(res.statusCode).to.be.equal(200);

        res.on("data", (data) => {
          const response = JSON.parse(data);
          expect(response).to.be.an("object");
          expect(Object.keys(response).indexOf("index")).to.be.greaterThan(-1);
          expect(Object.keys(response).indexOf("uuid")).to.be.greaterThan(-1);
          expect(Object.keys(response).indexOf("pattern")).to.be.greaterThan(
            -1
          );
          expect(response.pattern).to.be.an("array");
          expect(Object.keys(response).indexOf("height")).to.be.greaterThan(-1);
          expect(Object.keys(response).indexOf("width")).to.be.greaterThan(-1);
          done();
        });
      })
      .on("error", (e) => {
        throw e;
      });
  });

  it("verifies /v1/tang.json successful response from api gateway", (done) => {
    const tangApiEndpoint = apiEndpoint.replace(/v1\/$/, "v1/tang.json");
    console.info("tang api endpoint:", tangApiEndpoint);
    https
      .get(tangApiEndpoint, (res) => {
        expect(res.statusCode).to.be.equal(200);

        res.on("data", (data) => {
          const response = JSON.parse(data);
          expect(response).to.be.an("object");
          expect(Object.keys(response).indexOf("index")).to.be.greaterThan(-1);
          expect(Object.keys(response).indexOf("English")).to.be.greaterThan(
            -1
          );
          expect(response.English).to.be.an("object");
          expect(Object.keys(response).indexOf("Chinese")).to.be.greaterThan(
            -1
          );
          expect(response.Chinese).to.be.an("object");
          expect(Object.keys(response).indexOf("tags")).to.be.greaterThan(-1);
          expect(response.tags).to.be.an("array");
          done();
        });
      })
      .on("error", (e) => {
        throw e;
      });
  });
});
