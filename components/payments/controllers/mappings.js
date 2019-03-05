/**
 * mappings.js
 * This file is the entry to the controller.
 * It requires express server and defines the actions to
 * all the payment route.
 */

"use strict";

const router = require("express").Router({ mergeParams: true });
const validator = require("utils/validators");
const actions = require("./actions");

router.post(
  "/charge",
  validator.validateNewPayment,
  actions.makePayment
);

module.exports = router;
