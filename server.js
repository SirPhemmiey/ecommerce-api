
"use strict";

require("app-module-path/register");

const config = require("./config");

const DEFAULT_PORT = 3000;
//require("app-module-path").addPath(path.join(__dirname, "/lib"));

// const server = require('')
//     , appConfig = require('./appConfig')
//     , app    = require('express')();

// server.setup(app, appConfig.setup);

const connection = mysql.createConnection({
  host: config.dbConfig.host,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database
});

connection.connect(err => {
  if (err) {
      throw new Error(err);
  }
});


const app = require("./index");

app.set("port", process.env.PORT || DEFAULT_PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`App is running on ${server.address().port}`);
});
