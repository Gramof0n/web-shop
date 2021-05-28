"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartColumnRename1622218356903 = void 0;
class cartColumnRename1622218356903 {
    constructor() {
        this.name = 'cartColumnRename1622218356903';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "purchasedAmount" TO "total_price"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "total_price" TO "purchasedAmount"`);
    }
}
exports.cartColumnRename1622218356903 = cartColumnRename1622218356903;
//# sourceMappingURL=1622218356903-cart-column-rename.js.map