
/**
 * server.js
 * This is the core file of the application
 */
"use strict";

require("app-module-path/register");

require("newrelic");

const config = require("./config");

const logger = require("config/winston");

const mysql = require("mysql");

const DEFAULT_PORT = 3000;

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
    // The server is either down or restarting (takes a while sometimes).
    if (err) {
      logger.error(err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect, to avoid a hot loop, and to allow our node script to process asynchronous requests in the meantime.
    }
  }); 
  // If you're also serving http, display a 503 error.
  connection.on("error", function(err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually lost due to either server restart, or a connnection idle timeout
      handleDisconnect();
    } else {
      throw new Error(err); // server variable configures this)
    }
  });
}

handleDisconnect();

const app = require("./index");


app.set("port", process.env.PORT || DEFAULT_PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`App is running on ${server.address().port}`);
});
