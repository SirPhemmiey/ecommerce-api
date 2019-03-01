"use strict";

const path = require("path");
const helmet = require("helmet");
const express = require("express");
const healthcheck = require("maikai");
const methodOverride = require("method-override");
const errorHandler = require("./utils/handlers");

const app = express();

require("app-module-path").addPath(path.join(__dirname, "/component"));

// Add all routes and route-handlers for the app
function serviceRoutes(app) {
  // Add advanced healthcheck middleware (incl. database check)
  const check = healthcheck();
  const AdvancedHealthcheckers = require("healthcheck-middleware");
  const advCheckers = new AdvancedHealthcheckers();
  // Database health check is cached for 10000ms = 10 seconds!
  check.addCheck("db", "usersQuery", advCheckers.dbUsersCheck, {
    minCacheMs: 10000
  });
  app.use(check.express());

  // app.use('/',      require('homedoc')); // attach to root route
  // app.use('/users', require('users')); // attach to sub-route
  app.use("/customers", require("components/customers"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(serviceRoutes(app));

app.use(methodOverride());

app.use(errorHandler(app));

//handle exceptions
process.on("uncaughtException", error => {
  console.error("There was an uncaught error", error);
  process.exit(1);
});

module.exports = app;
