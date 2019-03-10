
/**
 * server.js
 * This is the core file of the application
 */

"use strict";

require("app-module-path/register");

require("newrelic");

const DEFAULT_PORT = 3000;

const app = require("./index");

app.set("port", process.env.PORT || DEFAULT_PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`App is running on ${server.address().port}`);
});

module.exports = app;
