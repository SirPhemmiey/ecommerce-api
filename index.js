"use strict";

//This allows application-level modules to be required as if they were installed into the node_modules directory
require("app-module-path/register");

//Define all dependencies needed
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const healthcheck = require("maikai");
const cors = require("cors");
const methodOverride = require("method-override");
const { productionErrors, developmentErrors } = require("./utils/handlers");
const config = require("./config");
const responseTime = require('response-time');
const logger = require("./config/winston");
const compression = require("compression");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit"); //Pacakage to limit repeated requests to public APIs and/or endpoints.
const hpkp = require("hpkp");
const ninetyDaysInSeconds = 7776000;

const customerComponent = require("components/customers");
const productComponent = require("components/products");
const shoppingCartComponent = require("components/shoppingCart");
const paymentComponent = require("components/payments");

const app = express();

app.use(helmet());
app.use(hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456='],
  // Set the header based on a condition.
  // This is optional.
  setIf: function (req, res) {
    return req.secure
  }
}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  }
}));
app.use(helmet.xssFilter());
app.use(helmet.expectCt({
  enforce: true,
  maxAge: 123
}));
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
const limiter = new rateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 100, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});
app.use(limiter);

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


app.use(compression()); //Compress all responses
app.use(responseTime()); //Create a middleware that adds a X-Response-Time header to responses.
app.use(cors());
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator()); //Expose a bunch of validation methods
app.use(methodOverride());
app.use(morgan("combined", { stream: logger.stream }));

app.use(developmentErrors);

if (process.env.NODE_ENV === 'production') {
  app.use(productionErrors);
}

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

// const transport = nodemailer.createTransport('SMTP', { // [1]
//   service: "Gmail",
//   auth: {
//     user: "oluwafemiakinde@gmail.com",
//     pass: "Algorithm212"
//   }
// });
// const transport = nodemailer.createTransport("smtps://oluwafemiakinde@gmail.com:"+encodeURIComponent("Algorithm") + "@smtp.gmail.com:465"); 


//Overide the behaviour of Node process terminating on any uncaught exception (explicit/implicit).
// process.on("uncaughtException", error => {
//   logger.error(error);
//   process.exit(1);
// });


// transport.sendMail({
//   from: 'alerts@mycompany.com',
//   to: 'sirphemmiey@gmail.com',
//   subject: "Subject",
//   text: "text"
// }, function (err) {
//    if (err) logger.error(err);
//    process.exit(1)
// })

//Get notified of anything that is taking down your Node process while in production
if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', err => {
    logger.error(err.stack);
    // transport.sendMail({
    //   from: 'alerts@mycompany.com',
    //   to: 'sirphemmiey@gmail.com',
    //   subject: err.message,
    //   text: err.stack
    // }, function (err) {
    //    if (err) logger.error(err);
    //    process.exit(1)
    // })
    transport.sendMail({
      from: 'alerts@mycompany.com',
      to: 'sirphemmiey@gmail.com',
      subject: "Subject",
      text: "text"
    }, function (err) {
       if (err) logger.error(err);
       process.exit(1)
    })
  })
}

module.exports = app;
