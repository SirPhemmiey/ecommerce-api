"use strict";

require("app-module-path/register");

const config = require("./config");

const winston = require("winston");

const mysql = require("mysql");

const morgan = require("morgan");

const DEFAULT_PORT = 3000;

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   defaultMeta: { service: "user-service" },
//   transports: [
//     // - Write all logs with level 'info' and below to 'conbined.log'
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" })
//   ]
// });

// //If we're not in production the log to the 'console' with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// if (process.env.NODE_ENV != "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple()
//     })
//   );
// }

let connection;
function handleDisconnect() {
  connection = mysql.createConnection({
    host: config.dbConfig.host,
    user: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.database
  }); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

const app = require("./index");

// connection.end(msg => {
//   console.log("Connection has ended!");
// })

app.set("port", process.env.PORT || DEFAULT_PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`App is running on ${server.address().port}`);
});
