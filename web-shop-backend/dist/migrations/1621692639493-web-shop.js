"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webShop1621692639493 = void 0;
class webShop1621692639493 {
    constructor() {
        this.name = 'webShop1621692639493';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "img_url" character varying NOT NULL, "amount" integer NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "webshop_user" ("webshop_user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_abef2ba50949df7bc1c105f80d7" PRIMARY KEY ("webshop_user_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "webshop_user"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
exports.webShop1621692639493 = webShop1621692639493;
//# sourceMappingURL=1621692639493-web-shop.js.map