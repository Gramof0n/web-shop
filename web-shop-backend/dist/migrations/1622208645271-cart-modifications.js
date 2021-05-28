"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModifications1622208645271 = void 0;
class cartModifications1622208645271 {
    constructor() {
        this.name = 'cartModifications1622208645271';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" ADD "isCheckedOut" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "purchasedAmount" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "dateOfPurchase" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dateOfPurchase"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "purchasedAmount"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "isCheckedOut"`);
    }
}
exports.cartModifications1622208645271 = cartModifications1622208645271;
//# sourceMappingURL=1622208645271-cart-modifications.js.map