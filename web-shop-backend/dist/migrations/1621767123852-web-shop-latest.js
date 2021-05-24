"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webShopLatest1621767123852 = void 0;
class webShopLatest1621767123852 {
    constructor() {
        this.name = 'webShopLatest1621767123852';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "username" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "username"`);
    }
}
exports.webShopLatest1621767123852 = webShopLatest1621767123852;
//# sourceMappingURL=1621767123852-web-shop-latest.js.map