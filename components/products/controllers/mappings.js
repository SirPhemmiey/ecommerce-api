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
const cache = require("utils/cache");

router.get("/getProducts", cache, actions.getProducts);
router.get("/filterProducts", actions.filterProducts);
router.get(
  "/searchProducts",
  validator.validateSearchTerm,
  actions.searchProducts
);
router.get("/getProduct/:product_id([0-9]+)", actions.getProduct);
router.get("/inCategory/:category_id([0-9]+)", actions.getProductsCategory);
router.get("/inDepartment/:department_id([0-9]+)", actions.getProductsDepartment);

router.put(
  "/editProduct/:product_id([0-9]+)",
  validator.validateEditProduct,
  actions.editProduct
);
router.delete(
  "/deleteProduct/:product_id([0-9]+)",
  validator.validateDeleteProduct,
  actions.deleteProduct
);

router.put(
  "/editCategory/:category_id([0-9]+)",
  validator.validateEditCategory,
  actions.editCategory
);
router.delete(
  "/deleteCategory/:category_id([0-9]+)",
  validator.validateDeleteCategory,
  actions.deleteCategory
);

router.put(
  "/editDepartment/:department_id([0-9]+)",
  validator.validateEditCategory,
  actions.editDepartment
);
router.delete(
  "/deleteDepartment/:department_id([0-9]+)",
  validator.validateDeleteDepartment,
  actions.deleteDepartment
);

module.exports = router;
