const { spawn } = require("child_process");
const request = require("request");
const test = require("tape");

// Start the app
const env = Object.assign({}, process.env, { PORT: 5000 });
const child = spawn("node", ["app.js"], { env });

test("responds to requests", (t) => {
  t.plan(4);
  let counter = 0; // Closure to ensure only one reqeust
  // Wait until the server is ready
  child.stdout.on("data", (_) => {
    // Make a request to our app
    counter++;
    if (counter === 1) {
      request("http://127.0.0.1:5000", (error, response, body) => {
        // stop the server
        child.kill();

        // No error
        t.false(error);
        // Successful response
        t.equal(response.statusCode, 200);
        // Assert content checks
        t.notEqual(
          body.indexOf("<title>Game of Life | ©Leslie Wong</title>"),
          -1
        );
        t.notEqual(body.indexOf("Wait a moment"), -1);
      });
    }
  });
});
