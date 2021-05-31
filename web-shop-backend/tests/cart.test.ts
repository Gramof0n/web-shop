process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

const url = "http://localhost:4000/api/v1";

describe("Cart endpoints", () => {
  describe("GET cart route", () => {
    it("should get the cart for user with the ID of 2", async () => {
      const res = await chai.request(url).get("/cart/2");

      expect(res.body).to.be.an("object").and.to.have.property("cart_id");
      expect(res.body).to.be.an("object").and.to.have.property("total_price");
      expect(res.body).to.be.an("object").and.to.have.property("user");
      expect(res.body).to.be.an("object").and.to.have.property("products");
    });
  });

  describe("GET add products to cart", () => {
    it("should add products with the ID of 5 and 4 to the user with the ID of 4", async () => {
      await chai.request(url).get("/cart/add/user_id=4&product_id=5");
      await chai.request(url).get("/cart/add/user_id=4&product_id=4");

      const res = await chai.request(url).get("/cart/4");

      for (let product of res.body.products) {
        expect(product).to.be.an("object").and.to.have.property("product_id");
      }
    });
  });

  describe("GET delete product from cart", () => {
    it("should remove a product with the ID of 5 from the user with the ID of 4", async () => {
      const previous_cart = await chai.request(url).get("/cart/4");

      await chai.request(url).get("/cart/remove/user_id=4&product_id=5");

      const current_cart = await chai.request(url).get("/cart/4");

      expect(previous_cart.body.products.length).to.be.greaterThan(
        current_cart.body.products.length
      );
    });
  });

  describe("GET clear all from cart", () => {
    it("should remove everything from cart of the user with the ID of 4", async () => {
      await chai.request(url).get("/cart/clear/4");

      const current_cart = await chai.request(url).get("/cart/4");

      expect(current_cart.body.products.length).to.be.equal(0);
    });
  });
});
