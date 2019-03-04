/**
 * mappings.js
 * This file is the entry to the controller.
 * It requires express server and defines the actions to
 * all the product {item} route.
 */

"use strict";

const router = require("express").Router({ mergeParams: true });
const validator = require("utils/validators");
const { catchError } = require("utils/handlers");
const actions = require("./actions");

// photoRouter.get(‘/:id([0-9]+)’, lookupPhoto, function(req, res) {

router.get("/getProducts", actions.getProducts);
router.get("/filterProducts", actions.filterProducts);
router.get(
  "/searchProducts",
  validator.validateSearchTerm,
  actions.searchProducts
);
router.get("/getProduct/:product_id", actions.getProduct);
router.get("/inCategory/:category_id", actions.getProductsCategory);
router.get("/inDepartment/:department_id", actions.getProductsDepartment);
//router.post("/addProduct", validator.validateNewCustomer, catchError(actions.registerCustomer));

module.exports = router;
