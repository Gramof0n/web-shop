"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartColumnRemove1622218978537 = void 0;
class cartColumnRemove1622218978537 {
    constructor() {
        this.name = 'cartColumnRemove1622218978537';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "isCheckedOut"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart" ADD "isCheckedOut" boolean DEFAULT false`);
    }
}
exports.cartColumnRemove1622218978537 = cartColumnRemove1622218978537;
//# sourceMappingURL=1622218978537-cart-column-remove.js.map