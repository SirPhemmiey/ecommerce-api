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

/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: integer
 *       discounted_price:
 *        type:  integer
 *       image:
 *         type: string
 *       image_2:
 *        type: string
 *       thumbnail:
 *        type: string
 *      diaply:
 *        type: integer
 */

/**
 * @swagger
 * /api/v1/product/getProducts:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get("/getProducts", cache, actions.getProducts);

/**
 * @swagger
 * /api/v1/product/filterProducts:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products that is in a particular category and department
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of products in a particular category and department
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get("/filterProducts", cache, actions.filterProducts);

/**
 * @swagger
 * /api/v1/product/searchProducts:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products that matches the search term
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of products that matches the search term
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get(
  "/searchProducts",
  cache,
  validator.validateSearchTerm,
  actions.searchProducts
);

/**
 * @swagger
 * /api/v1/product/getProduct/{product_id}:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns a single product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         description: Product's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get("/getProduct/:product_id([0-9]+)", cache, actions.getProduct);

/**
 * @swagger
 * /api/v1/product/inCategory/{category_id}:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products in a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category_id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get(
  "/inCategory/:category_id([0-9]+)",
  cache,
  actions.getProductsCategory
);

/**
 * @swagger
 * /api/v1/product/inDepartment/{department_id}:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns all products in a department
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: department_id
 *         description: Department's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get(
  "/inDepartment/:department_id([0-9]+)",
  cache,
  actions.getProductsDepartment
);

/**
 * @swagger
 * /api/v1/product/{product_id}:
 *   put:
 *     tags: Products
 *     description: Updates a single product
 *     produces: application/json
 *     parameters:
 *       name: product
 *       in: body
 *       description: Fields for the Product
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(
  "/editProduct/:product_id([0-9]+)",
  validator.validateEditProduct,
  actions.editProduct
);

/**
 * @swagger
 * /api/v1/product/deleteProduct/{product_id}:
 *   delete:
 *     tags:
 *       - Products
 *     description: Deletes a single product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         description: Product's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(
  "/deleteProduct/:product_id([0-9]+)",
  validator.validateDeleteProduct,
  actions.deleteProduct
);

/**
 * @swagger
 * /api/v1/product/editCategory/{product_id}:
 *   put:
 *     tags: Products
 *     description: Updates a single category
 *     produces: application/json
 *     parameters:
 *       name: category
 *       in: body
 *       description: Fields for the Category
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(
  "/editCategory/:category_id([0-9]+)",
  validator.validateEditCategory,
  actions.editCategory
);

/**
 * @swagger
 * /api/v1/product/deleteCategory/{category_id}:
 *   delete:
 *     tags:
 *       - Products
 *     description: Deletes a single category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category_id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(
  "/deleteCategory/:category_id([0-9]+)",
  validator.validateDeleteCategory,
  actions.deleteCategory
);

/**
 * @swagger
 * /api/v1/product/editDepartment/{department_id}:
 *   put:
 *     tags: Products
 *     description: Updates a single department
 *     produces: application/json
 *     parameters:
 *       name: department
 *       in: body
 *       description: Fields for the Category
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(
  "/editDepartment/:department_id([0-9]+)",
  validator.validateEditCategory,
  actions.editDepartment
);

/**
 * @swagger
 * /api/v1/product/deleteDepartment/{department_id}:
 *   delete:
 *     tags:
 *       - Products
 *     description: Deletes a single department
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: department_id
 *         description: Department's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(
  "/deleteDepartment/:department_id([0-9]+)",
  validator.validateDeleteDepartment,
  actions.deleteDepartment
);

module.exports = router;
