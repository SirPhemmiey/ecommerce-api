"use strict";

require("app-module-path/register");

const path = require("path");
const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const healthcheck = require("maikai");
const cors = require("cors");
const methodOverride = require("method-override");
const { errorHandler } = require("./utils/handlers");
const config = require("./config");
const logger = require("./config/winston");

const customerComponent = require("components/customers");
const productComponent = require("components/products");
const shoppingCartComponent = require("components/shoppingCart");
const paymentComponent = require("components/payments");

const app = express();

app.use(helmet());

//require("app-module-path").addPath(path.join(__dirname, "/component"));

// Add all routes and route-handlers for the app
// function serviceRoutes(app) {
//   // Add advanced healthcheck middleware (incl. database check)
//   const check = healthcheck();
//   const AdvancedHealthcheckers = require("healthcheck-middleware");
//   const advCheckers = new AdvancedHealthcheckers();
//   // Database health check is cached for 10000ms = 10 seconds!
//   // check.addCheck("db", "usersQuery", advCheckers.dbUsersCheck, {
//   //   minCacheMs: 10000
//   // });

//   async function dbCheck() {
//     const connection = mysql.createConnection({
//       host: config.dbConfig.host,
//       user: config.dbConfig.user,
//       password: config.dbConfig.password,
//       database: config.dbConfig.database
//     });

//     connection.connect(err => {
//       if (err) {
//           throw new Error(err);
//       }
//     });
//   }
//   check.addCheck("database", "timeout", dbCheck, { minCacheMs: 10000 });

//   app.use(check.express());

//   // app.use('/',      require('homedoc')); // attach to root route
//   // app.use('/users', require('users')); // attach to sub-route
//   app.use("/customers", customerComponent);
// }
app.use(cors());
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(morgan("combined", { stream: logger.stream }));


//app.use(serviceRoutes(app));

app.use("/customer", customerComponent);
app.use("/product", productComponent);
app.use("/shoppingcart", shoppingCartComponent);
app.use("/payment", paymentComponent);

//handle error handling routing
app.use((req, res) => {
  logger.error(`${500} - The endpoint is not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.sendStatus(404);
});



//app.use(errorHandler(app));

//handle exceptions
process.on("uncaughtException", error => {
  logger.error(error);
  process.exit(1);
});

module.exports = app;
