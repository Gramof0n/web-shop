"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartProductManyMany1622212860394 = void 0;
class cartProductManyMany1622212860394 {
    constructor() {
        this.name = 'cartProductManyMany1622212860394';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b4f84657efbdd70a5bc0613f6b0"`);
        await queryRunner.query(`CREATE TABLE "cart_products_product" ("cartCartId" integer NOT NULL, "productProductId" integer NOT NULL, CONSTRAINT "PK_115cf468d00e46953809f7e41ee" PRIMARY KEY ("cartCartId", "productProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca1ca71f7750b318db980fb24d" ON "cart_products_product" ("cartCartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_789ac4bc8a9a9677c4ea8d06a4" ON "cart_products_product" ("productProductId") `);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cartCartId"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_ca1ca71f7750b318db980fb24dc" FOREIGN KEY ("cartCartId") REFERENCES "cart"("cart_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_789ac4bc8a9a9677c4ea8d06a49" FOREIGN KEY ("productProductId") REFERENCES "product"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_789ac4bc8a9a9677c4ea8d06a49"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_ca1ca71f7750b318db980fb24dc"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cartCartId" integer`);
        await queryRunner.query(`DROP INDEX "IDX_789ac4bc8a9a9677c4ea8d06a4"`);
        await queryRunner.query(`DROP INDEX "IDX_ca1ca71f7750b318db980fb24d"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b4f84657efbdd70a5bc0613f6b0" FOREIGN KEY ("cartCartId") REFERENCES "cart"("cart_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.cartProductManyMany1622212860394 = cartProductManyMany1622212860394;
//# sourceMappingURL=1622212860394-cart-product-many-many.js.map