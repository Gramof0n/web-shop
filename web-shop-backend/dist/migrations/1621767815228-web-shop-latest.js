"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webShopLatest1621767815228 = void 0;
class webShopLatest1621767815228 {
    constructor() {
        this.name = 'webShopLatest1621767815228';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_admin"`);
    }
}
exports.webShopLatest1621767815228 = webShopLatest1621767815228;
//# sourceMappingURL=1621767815228-web-shop-latest.js.map