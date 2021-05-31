"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
const url = "http://localhost:4000/api/v1";
describe("Categories endpoints", () => {
    describe("GET all categories route", () => {
        it("should return an array of all categories", (done) => {
            chai_1.default
                .request(url)
                .get("/users")
                .end((_, res) => {
                expect(res.body).to.be.an("array");
                done();
            });
        });
        it("every category should contain category_name attribute", (done) => {
            chai_1.default
                .request(url)
                .get("/categories")
                .end((_, res) => {
                for (let category of res.body) {
                    expect(category)
                        .to.be.an("object")
                        .and.to.have.property("category_name");
                }
                done();
            });
        });
    });
    describe("POST a category", () => {
        it(`should add a new category to database and return "Successfully added a new category"`, async () => {
            const before_post_categories = await (await chai_1.default.request(url).get("/categories")).body;
            const res = await chai_1.default
                .request(url)
                .post("/categories")
                .send({ name: `test_category` });
            const after_post_categories = await (await chai_1.default.request(url).get("/categories")).body;
            expect(after_post_categories.length).to.be.greaterThan(before_post_categories.length);
            expect(res.body)
                .to.be.an("object")
                .and.include({ message: "Successfully added a new category" });
        });
        it('should return "Category already exists in database" when attempting to add an existing category', async () => {
            const res = await chai_1.default
                .request(url)
                .post("/categories")
                .send({ name: `keyboards` });
            expect(res.body.error)
                .to.be.an("object")
                .and.include({ message: "Category already exists in database" });
        });
    });
    describe("DELETE a category by name", () => {
        it('should remove a category from database and return "Category successfully deleted"', async () => {
            const before_delete_categories = await (await chai_1.default.request(url).get("/categories")).body;
            const res = await chai_1.default.request(url).delete("/categories/test_category");
            const after_delete_categories = await (await chai_1.default.request(url).get("/categories")).body;
            expect(before_delete_categories.length).to.be.greaterThan(after_delete_categories.length);
            expect(res.body)
                .to.be.an("object")
                .and.include({ message: "Category successfully deleted" });
        });
    });
});
//# sourceMappingURL=categories.test.js.map