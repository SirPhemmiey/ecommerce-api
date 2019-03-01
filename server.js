
"use strict";

require("app-module-path/register");

const Sequelize = require("sequelize");

const DEFAULT_PORT = 3000;
//require("app-module-path").addPath(path.join(__dirname, "/lib"));

// const server = require('')
//     , appConfig = require('./appConfig')
//     , app    = require('express')();

// server.setup(app, appConfig.setup);

const sequelize = new Sequelize('ecommerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});

  try {
      const conn = await sequelize.authenticate();
  }
  catch(err) {
    throw new Error(`Could not connect to database: ${err.toString()}`);
  }

const app = require("./index");

app.set("port", process.env.PORT || DEFAULT_PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`App is running on ${server.address().port}`);
});
