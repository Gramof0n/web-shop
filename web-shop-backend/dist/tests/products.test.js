"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const express_1 = require("express");
const productValidation_1 = require("../validation/productValidation");
chai_1.default.use(chai_http_1.default);
const url = "http://localhost:4000/api/v1";
const counter = Math.floor(Math.random() * (1000000 - 1) + 1);
describe("Product endpoints", () => {
    describe("GET all products route", () => {
        it("should return a json array of all products", (done) => {
            chai_1.default
                .request(url)
                .get("/products")
                .end((_, res) => {
                chai_1.expect(res.body).to.be.an("array");
                done();
            });
        });
    });
    describe("GET one product route", () => {
        it("should return a product with an ID of 10", (done) => {
            chai_1.default
                .request(url)
                .get("/products/10")
                .end((_, res) => {
                chai_1.expect(res.body)
                    .to.be.an("object")
                    .and.to.include({ product_id: 10 });
                done();
            });
        });
        it(`should throw an error if the product with specified ID doesn't exist`, (done) => {
            chai_1.default
                .request(url)
                .get("/products/123")
                .end((_, res) => {
                chai_1.expect(res.body.error).not.to.be.equal({});
                done();
            });
        });
    });
    describe("POST add product route", () => {
        it("should return 'Added product successfully'", (done) => {
            chai_1.default
                .request(url)
                .post("/products")
                .send({
                name: `test${counter}`,
                description: "test",
                category: "monitor",
                amount: 10,
                price: 10,
            })
                .end((_, res) => {
                chai_1.expect(res.body)
                    .to.be.an("object")
                    .and.include({ message: "Added product successfully" });
                done();
            });
        });
    });
    describe("Product validation", () => {
        it("should return false if product name already exists", async () => {
            const Product = {
                name: "Test",
                description: "Test",
                category: "monitor",
                amount: 3,
                price: 252,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product name is empty ", async () => {
            const Product = {
                name: ``,
                description: "Test",
                category: "monitor",
                amount: 3,
                price: 252,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product description is empty ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "",
                category: "monitor",
                amount: 3,
                price: 252,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product category is empty ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "",
                amount: 3,
                price: 252,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product price is empty ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                amount: 3,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product price is not a number ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                amount: 3,
                price: "dad",
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product price is negative ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                amount: 3,
                price: -1,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product amount is empty ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                price: 10,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product amount is not a number ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                amount: "dasd",
                price: 10,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
        it("should return false if product amount is negative ", async () => {
            const Product = {
                name: `Test${counter}`,
                description: "Test",
                category: "monitor",
                amount: -3,
                price: 1,
            };
            chai_1.expect(await productValidation_1.productValidation(express_1.response, Product)).to.equal(false);
        });
    });
});
//# sourceMappingURL=products.test.js.map