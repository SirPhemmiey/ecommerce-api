/***
 * Test all shopping cart endpoints
 */

"use strict";

const request = require("supertest");
const app = require("../../server");
const { expect } = require("chai");


describe("Shopping Cart", () => {

  //POST an item to the shopping cart
  describe("POST Product Item", () => {
    it("Should add an item to the cart", done => {
      const cartData = {
        cart_id: 1,
        product_id: 2,
        attributes: "This product is nice",
        quantity: 2,
        buy_now: 1,
        added_on: new Date()
      };
      request(app)
        .post("/shoppingcart/addToCart")
        .send(cartData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal("Item added successfully");
          return done();
        });
    });
  });
  
});
