/**
 * actions.js
 * This is the file that will handle product {items} related
 * actions.
 */

"use strict";
const { validationResult } = require("express-validator/check");
const Product = require("../models/products");
const logger = require("config/winston");
const actions = {},
  model = new Product();

  //Function to calculate offset for pagination
function paginate(page, limit) {
  let _page = parseInt(page, 10); //convert to an integer
  if (isNaN(_page) || _page < 1) {
    _page = 1;
  }
  let _limit = parseInt(limit, 10); //convert to an integer

  //be sure to cater for all possible cases
  if (isNaN(_limit)) {
    _limit = 10;
  } else if (_limit > 50) {
    _limit = 50;
  } else if (_limit < 1) {
    _limit = 1;
  }
  const offset = (_page - 1) * _limit;

  return {
    offset,
    _limit,
    page: _page
  };
}

//GET all products and paginate the result
actions.getProducts = (req, res) => {
  const { limit, page } = req.query;
  let { _limit, offset } = paginate(page, limit);
  const pageOptions = {
    limit: _limit,
    offset
  };
  model.getProducts(pageOptions, (err, products, count) => {
    if (err) {
      logger.error(err.sqlMessage);
      return res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    }
    res.status(200).json({
      success: true,
      count: count,
      products
    });
  });
};

//GET product item information/detal
actions.getProduct = (req, res) => {
  const { product_id } = req.params;
  const id = parseInt(product_id, 10);
  if (product_id && !isNaN(id)) {
    model.getProduct(id, (err, product) => {
      if (err) {
        logger.error(err.sqlMessage);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(200).json({
        success: true,
        product
      });
    });
  }
  else {
    res.status(500).json({
      success: false,
      message: "Product ID should be an integer"
    });
  }
};

//GET products based on the selected department and category, and paginate the result
actions.filterProducts = (req, res) => {
  const { department_id, category_id } = req.body;
  const { limit, page } = req.query;
  const { _limit, offset } = paginate(page, limit);
  const pageOptions = {
    department_id,
    category_id,
    offset,
    limit: _limit
  };
  model.filterProducts(pageOptions, (err, products, count) => {
    if (err) {
      logger.error(err.sqlMessage);
      return res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    }
    res.status(200).json({
      success: true,
      count,
      products
    });
  });
};

//GET a list of products in a category and paginate the result
actions.getProductsCategory = (req, res) => {
  const { category_id } = req.params;
  const { limit, page } = req.query;
  let { _limit, offset } = paginate(page, limit);
  const pageOptions = {
    category_id,
    limit: _limit,
    offset
  };
  const id = parseInt(category_id, 10);
  if (category_id && !isNaN(id)) {
    model.getProductsCategory(pageOptions, (err, products, count) => {
      if (err) {
        logger.error(err.sqlMessage);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(200).json({
        success: true,
        count,
        products
      });
    });
  }
  else {
    res.status(500).json({
      success: false,
      message: "Category ID should be an integer"
    });
  }
};

//GET a list of products in a department
actions.getProductsDepartment = (req, res) => {
  const { department_id } = req.params;
  const { limit, page } = req.query;
  let { _limit, offset } = paginate(page, limit);
  const pageOptions = {
    department_id,
    limit: _limit,
    offset
  };
  const id = parseInt(department_id, 10);
  if (department_id && !isNaN(id)) {
    model.getProductsDepartment(pageOptions, (err, products, count) => {
      if (err) {
        logger.error(err.sqlMessage);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(200).json({
        success: true,
        count,
        products
      });
    });
  }
  else {
    res.status(500).json({
      success: false,
      message: "Department ID should be an integer"
    });
  }
};

//GET search results and paginate the result
actions.searchProducts = (req, res) => {
  const { search_term, page, limit } = req.query;
  let errorMessage;
  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });
  if (errors.length < 1) {
    let { _limit, offset } = paginate(page, limit);
    const filterParams = {
      search_term,
      limit: _limit,
      offset
    };
    model.searchProduct(filterParams, (err, products, count) => {
      if (err) {
        logger.error(err.sqlMessage);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(200).json({
        success: true,
        count,
        products
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: errorMessage
    });
    logger.error(errorMessage);
  }
};

actions.editProduct = (req, res) => {
  const {} = req.body;
};

module.exports = actions;
