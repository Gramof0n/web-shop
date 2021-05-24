process.env.NODE_ENV = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { response } from "express";
import { Product_type } from "types";
import { productValidation } from "../validation/productValidation";

chai.use(chaiHttp);
const url = "http://localhost:4000/api/v1";

const counter = Math.floor(Math.random() * (1000000 - 1) + 1);

describe("Product endpoints", () => {
  describe("GET all products route", () => {
    it("should return a json array of all products", (done) => {
      chai
        .request(url)
        .get("/products")
        .end((_, res) => {
          //console.log(res.body);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });
  describe("GET one product route", () => {
    it("should return a product with an ID of 1", (done) => {
      chai
        .request(url)
        .get("/products/1")
        .end((_, res) => {
          expect(res.body).to.be.an("object").and.to.include({ product_id: 1 });
          done();
        });
    });

    it(`should throw an error if the product with specified ID doesn't exist`, (done) => {
      chai
        .request(url)
        .get("/products/123")
        .end((_, res) => {
          expect(res.body.error).not.to.be.equal({});
          done();
        });
    });
  });

  describe("POST add product route", () => {
    it("should return 'Added product successfully'", (done) => {
      chai
        .request(url)
        .post("/products")
        .send({
          name: `test${counter}`,
          description: "test",
          category: "monitors",
          amount: 10,
          price: 10,
        })
        .end((_, res) => {
          expect(res.body)
            .to.be.an("object")
            .and.include({ message: "Added product successfully" });

          done();
        });
    });
  });

  describe("Product validation", () => {
    it("should return false if product name already exists", async () => {
      const Product: Product_type = {
        name: "Test",
        description: "Test",
        category: { category_name: "monitors" },
        amount: 3,
        price: 252,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product name is empty ", async () => {
      const Product: Product_type = {
        name: ``,
        description: "Test",
        category: { category_name: "monitors" },
        amount: 3,
        price: 252,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product description is empty ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "",
        category: { category_name: "monitors" },
        amount: 3,
        price: 252,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product category is empty ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "" },
        amount: 3,
        price: 252,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product price is empty ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        amount: 3,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product price is not a number ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        amount: 3,
        price: "dad",
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product price is negative ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        amount: 3,
        price: -1,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product amount is empty ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        price: 10,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product amount is not a number ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        amount: "dasd",
        price: 10,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });

    it("should return false if product amount is negative ", async () => {
      const Product: Product_type = {
        name: `Test${counter}`,
        description: "Test",
        category: { category_name: "monitors" },
        amount: -3,
        price: 1,
      };

      expect(await productValidation(response, Product)).to.equal(false);
    });
  });
});
