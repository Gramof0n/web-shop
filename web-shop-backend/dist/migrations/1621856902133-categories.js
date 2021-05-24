"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories1621856902133 = void 0;
class categories1621856902133 {
    constructor() {
        this.name = 'categories1621856902133';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "cateogry_name" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "version" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ALTER COLUMN "version" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8b4d0e2be5e945a828f313b4f30" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8b4d0e2be5e945a828f313b4f30"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ALTER COLUMN "version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
    }
}
exports.categories1621856902133 = categories1621856902133;
//# sourceMappingURL=1621856902133-categories.js.map