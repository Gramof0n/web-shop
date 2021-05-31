process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import { Category } from "../entities/Category";

chai.use(chaiHttp);
const expect = chai.expect;

const url = "http://localhost:4000/api/v1";

describe("Categories endpoints", () => {
  describe("GET all categories route", () => {
    it("should return an array of all categories", (done) => {
      chai
        .request(url)
        .get("/users")
        .end((_, res) => {
          expect(res.body).to.be.an("array");
          done();
        });
    });

    it("every category should contain category_name attribute", (done) => {
      chai
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
      const before_post_categories: Array<Category> = await (
        await chai.request(url).get("/categories")
      ).body;

      const res = await chai
        .request(url)
        .post("/categories")
        .send({ name: `test_category` });

      const after_post_categories: Array<Category> = await (
        await chai.request(url).get("/categories")
      ).body;

      expect(after_post_categories.length).to.be.greaterThan(
        before_post_categories.length
      );
      expect(res.body)
        .to.be.an("object")
        .and.include({ message: "Successfully added a new category" });
    });

    it('should return "Category already exists in database" when attempting to add an existing category', async () => {
      const res = await chai
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
      const before_delete_categories: Array<Category> = await (
        await chai.request(url).get("/categories")
      ).body;

      const res = await chai.request(url).delete("/categories/test_category");

      const after_delete_categories: Array<Category> = await (
        await chai.request(url).get("/categories")
      ).body;

      expect(before_delete_categories.length).to.be.greaterThan(
        after_delete_categories.length
      );
      expect(res.body)
        .to.be.an("object")
        .and.include({ message: "Category successfully deleted" });
    });
  });
});
